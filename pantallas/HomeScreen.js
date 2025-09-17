import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { obtenerExperiencias } from '../utilidades/AsyncStorage';
import { useTheme } from '../App.js'; 

export default function HomeScreen({ navigation }) {
  const [stats, setStats] = useState({ experiencias: 0, fotos: 0, lugares: 0 });
  const theme = useTheme(); 

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
    const unsubscribe = navigation.addListener('focus', cargarEstadisticas);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>🌿 EcoQuest</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text }]}>Tu Bitácora Verde Interactiva</Text>
      
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{stats.experiencias}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Experiencias</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{stats.fotos}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Fotos</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: theme.colors.card }]}>
          <Text style={[styles.statNumber, { color: theme.colors.primary }]}>{stats.lugares}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.text }]}>Lugares</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.ctaButton, { backgroundColor: theme.colors.primary }]}
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
  },
  ctaButton: {
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