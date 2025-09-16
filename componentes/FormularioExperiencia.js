import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { guardarExperiencia } from '../utilidades/AsyncStorage';

export default function FormularioExperiencia({ navigation }) {
  const [nota, setNota] = useState('');
  const [foto, setFoto] = useState(null);

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

  const handleGuardarExperiencia = async () => {
    if (!nota.trim()) {
      Alert.alert('Error', 'Por favor escribe una nota');
      return;
    }

    const nuevaExperiencia = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString(),
      nota: nota.trim(),
      foto: foto, // ← Ahora sí guarda la foto
      audio: null, // Por ahora null, luego agregaremos audio
      ubicacion: null // Por ahora null, luego agregaremos GPS
    };

    const exito = await guardarExperiencia(nuevaExperiencia);
    
    if (exito) {
      Alert.alert('Éxito', 'Experiencia guardada correctamente');
      setNota('');
      setFoto(null);
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

      {/* SECCIÓN MULTIMEDIA - CÁMARA */}
      <View style={styles.seccionMultimedia}>
        <Text style={styles.subtitulo}>Multimedia:</Text>
        
        <TouchableOpacity style={styles.botonMultimedia} onPress={tomarFoto}>
          <Text style={styles.textoBotonMultimedia}>📸 Tomar Foto</Text>
        </TouchableOpacity>

        {foto && (
          <Image source={{ uri: foto }} style={styles.vistaPreviaFoto} />
        )}
      </View>

      <Text style={styles.textoAyuda}>
        Próximamente: podrás agregar audio y ubicación
      </Text>

      <TouchableOpacity 
        style={styles.botonGuardar}
        onPress={handleGuardarExperiencia}
      >
        <Text style={styles.textoBoton}>Guardar Experiencia</Text>
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
  textoAyuda: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 30,
    textAlign: 'center',
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