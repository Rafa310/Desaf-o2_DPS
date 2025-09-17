import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import { guardarExperiencia } from '../utilidades/AsyncStorage';

export default function FormularioExperiencia({ navigation }) {
  const [nota, setNota] = useState('');
  const [foto, setFoto] = useState(null);
  const [ubicacion, setUbicacion] = useState(null);
  const [grabando, setGrabando] = useState(false);
  const [audioUri, setAudioUri] = useState(null);
  const grabacionRef = useRef(null);

  const tomarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se necesitan permisos de cámara');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setFoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  const obtenerUbicacion = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de ubicación denegado');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setUbicacion({
        latitud: location.coords.latitude,
        longitud: location.coords.longitude
      });
      Alert.alert('Ubicación guardada', '¡Tu ubicación se ha agregado!');
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    }
  };

  const iniciarGrabacion = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso de micrófono denegado');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      
      grabacionRef.current = recording;
      setGrabando(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo iniciar la grabación');
    }
  };

  const detenerGrabacion = async () => {
    try {
      setGrabando(false);
      await grabacionRef.current.stopAndUnloadAsync();
      const uri = grabacionRef.current.getURI();
      setAudioUri(uri);
      grabacionRef.current = null;
    } catch (error) {
      Alert.alert('Error', 'No se pudo detener la grabación');
    }
  };

  const handleGuardarExperiencia = async () => {
    if (!nota.trim()) {
      Alert.alert('Error', 'Por favor escribe una nota');
      return;
    }

    const nuevaExperiencia = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString(),
      nota: nota.trim(),
      foto: foto,
      audio: audioUri,
      ubicacion: ubicacion
    };

    const exito = await guardarExperiencia(nuevaExperiencia);
    
    if (exito) {
      Alert.alert('Éxito', 'Experiencia guardada correctamente');
      setNota('');
      setFoto(null);
      setUbicacion(null);
      setAudioUri(null);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'No se pudo guardar la experiencia');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nueva Experiencia Ecológica</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Describe tu experiencia sostenible..."
        value={nota}
        onChangeText={setNota}
        multiline
        numberOfLines={4}
      />

      <View style={styles.seccionMultimedia}>
        <Text style={styles.subtitulo}>Multimedia:</Text>
        
        <TouchableOpacity style={styles.botonMultimedia} onPress={tomarFoto}>
          <Text style={styles.textoBotonMultimedia}>📸 Tomar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonMultimedia} onPress={obtenerUbicacion}>
          <Text style={styles.textoBotonMultimedia}>📍 Obtener Ubicación</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.botonMultimedia, grabando && styles.botonGrabando]}
          onPress={grabando ? detenerGrabacion : iniciarGrabacion}
        >
          <Text style={styles.textoBotonMultimedia}>
            {grabando ? '⏹️ Detener Grabación' : '🎤 Grabar Audio'}
          </Text>
        </TouchableOpacity>

        {foto && (
          <Image source={{ uri: foto }} style={styles.vistaPreviaFoto} />
        )}

        {ubicacion && (
          <Text style={styles.textoUbicacion}>
            📍 Ubicación: {ubicacion.latitud.toFixed(4)}, {ubicacion.longitud.toFixed(4)}
          </Text>
        )}

        {audioUri && (
          <Text style={styles.textoAudio}>🎵 Audio grabado</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.botonGuardar}
        onPress={handleGuardarExperiencia}
      >
        <Text style={styles.textoBoton}>💾 Guardar Experiencia</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  seccionMultimedia: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2e8b57',
  },
  botonMultimedia: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonGrabando: {
    backgroundColor: '#ff4444',
  },
  textoBotonMultimedia: {
    color: 'white',
    fontWeight: 'bold',
  },
  vistaPreviaFoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'center',
  },
  textoUbicacion: {
    color: '#2e8b57',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  textoAudio: {
    color: '#2e8b57',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  botonGuardar: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});