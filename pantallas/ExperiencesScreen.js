import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { obtenerExperiencias } from '../utilidades/AsyncStorage';

export default function ExperiencesScreen({ navigation }) {
  const [experiencias, setExperiencias] = useState([]);

  const cargarExperiencias = async () => {
    const datos = await obtenerExperiencias();
    setExperiencias(datos);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarExperiencias);
    return unsubscribe;
  }, [navigation]);

  const renderExperiencia = ({ item }) => (
    <View style={styles.tarjeta}>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Text style={styles.nota}>{item.nota}</Text>
      <Text style={styles.detalles}>
        {item.foto ? '📸 ' : ''}
        {item.audio ? '🎵 ' : ''}
        {item.ubicacion ? '📍' : ''}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Experiencias</Text>
      
      <TouchableOpacity 
        style={styles.botonAgregar}
        onPress={() => navigation.navigate('NuevaExperiencia')}
      >
        <Text style={styles.textoBotonAgregar}>+ Nueva Experiencia</Text>
      </TouchableOpacity>

      <FlatList
        data={experiencias}
        renderItem={renderExperiencia}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.listaVacia}>
            No hay experiencias registradas. ¡Agrega la primera!
          </Text>
        }
      />
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
  },
  botonAgregar: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotonAgregar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lista: {
    flexGrow: 1,
  },
  listaVacia: {
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
    fontSize: 16,
  },
  tarjeta: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  fecha: {
    color: '#666',
    fontSize: 12,
    marginBottom: 5,
  },
  nota: {
    fontSize: 16,
    marginBottom: 5,
  },
  detalles: {
    color: '#888',
    fontSize: 14,
  },
});