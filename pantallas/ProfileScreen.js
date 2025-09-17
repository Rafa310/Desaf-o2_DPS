import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [usuario, setUsuario] = useState({
    nombre: 'Usuario EcoQuest',
    email: 'usuario@ecoquest.com',
    bio: 'Amante de la sostenibilidad 🌱',
    foto: null
  });

  const seleccionarFoto = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Se necesitan permisos para acceder a la galería');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setUsuario({ ...usuario, foto: result.assets[0].uri });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la foto');
    }
  };

  const guardarPerfil = () => {
    Alert.alert('Perfil guardado', 'Tus cambios se han guardado correctamente');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mi Perfil</Text>

      <TouchableOpacity onPress={seleccionarFoto} style={styles.contenedorFoto}>
        {usuario.foto ? (
          <Image source={{ uri: usuario.foto }} style={styles.fotoPerfil} />
        ) : (
          <View style={styles.fotoPlaceholder}>
            <Text style={styles.textoFoto}>📷</Text>
          </View>
        )}
        <Text style={styles.textoCambiarFoto}>Cambiar foto</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={usuario.nombre}
        onChangeText={(text) => setUsuario({ ...usuario, nombre: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={usuario.email}
        onChangeText={(text) => setUsuario({ ...usuario, email: text })}
        keyboardType="email-address"
      />

      <TextInput
        style={[styles.input, styles.inputBio]}
        placeholder="Biografía"
        value={usuario.bio}
        onChangeText={(text) => setUsuario({ ...usuario, bio: text })}
        multiline
        numberOfLines={3}
      />

      <TouchableOpacity style={styles.botonGuardar} onPress={guardarPerfil}>
        <Text style={styles.textoBotonGuardar}>💾 Guardar Cambios</Text>
      </TouchableOpacity>

      <Text style={styles.textoInfo}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f8f0',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
    textAlign: 'center',
  },
  contenedorFoto: {
    alignItems: 'center',
    marginBottom: 20,
  },
  fotoPerfil: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  fotoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoFoto: {
    fontSize: 40,
  },
  textoCambiarFoto: {
    color: '#2e8b57',
    marginTop: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    fontSize: 16,
  },
  inputBio: {
    height: 80,
    textAlignVertical: 'top',
  },
  botonGuardar: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotonGuardar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textoInfo: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
});