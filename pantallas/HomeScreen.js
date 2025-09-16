import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { obtenerExperiencias } from '../utilidades/AsyncStorage';

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ experiencias: 0, fotos: 0, lugares: 0 });

  const cargarEstadisticas = async () => {
    const experiencias = await obtenerExperiencias();
    const fotos = experiencias.filter(exp => exp.foto).length;
    const lugares = experiencias.filter(exp => exp.ubicacion).length;
    
    setStats({
      experiencias: experiencias.length,
      fotos: fotos,
      lugares: lugares
    });
  };

  useEffect(() => {
    // Recargar cuando la pantalla recibe foco
    const unsubscribe = navigation.addListener('focus', cargarEstadisticas);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 EcoQuest</Text>
      <Text style={styles.subtitle}>Tu Bitácora Verde Interactiva</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.experiencias}</Text>
          <Text style={styles.statLabel}>Experiencias</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.fotos}</Text>
          <Text style={styles.statLabel}>Fotos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.lugares}</Text>
          <Text style={styles.statLabel}>Lugares</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.ctaButton}
        onPress={() => navigation.navigate('NuevaExperiencia')}
      >
        <Text style={styles.ctaText}>➕ Crear Nueva Experiencia</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  ctaButton: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});