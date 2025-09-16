import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { guardarExperiencia } from '../utilidades/AsyncStorage';

export default function FormularioExperiencia({ navigation }) {
  const [nota, setNota] = useState('');

  const handleGuardarExperiencia = async () => {
    if (!nota.trim()) {
      Alert.alert('Error', 'Por favor escribe una nota');
      return;
    }

    const nuevaExperiencia = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString(),
      nota: nota.trim(),
      foto: null, // Por ahora null, luego agregaremos cámara
      audio: null, // Por ahora null, luego agregaremos audio
      ubicacion: null // Por ahora null, luego agregaremos GPS
    };

    const exito = await guardarExperiencia(nuevaExperiencia);
    
    if (exito) {
      Alert.alert('Éxito', 'Experiencia guardada correctamente');
      setNota('');
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

      <Text style={styles.textoAyuda}>
        Próximamente: podrás agregar foto, audio y ubicación
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