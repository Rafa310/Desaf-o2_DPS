import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../App.js'; 

export default function SettingsScreen() {
  const theme = useTheme(); 
  const [configuracion, setConfiguracion] = useState({
    notificaciones: true,
    guardadoAuto: true
  });

  // Carga la configuración inicial
  useEffect(() => {
    cargarConfiguracion();
  }, []);

  const cargarConfiguracion = async () => {
    try {
      const configGuardada = await AsyncStorage.getItem('@configuracion_app');
      if (configGuardada) {
        setConfiguracion(JSON.parse(configGuardada));
      }
    } catch (error) {
      console.error('Error al cargar configuración:', error);
    }
  };

  const guardarConfiguracion = async (nuevaConfig) => {
    try {
      await AsyncStorage.setItem('@configuracion_app', JSON.stringify(nuevaConfig));
      setConfiguracion(nuevaConfig);
    } catch (error) {
      console.error('Error al guardar configuración:', error);
    }
  };

  const toggleConfiguracion = (key, value) => {
    const nuevaConfig = { ...configuracion, [key]: value };
    guardarConfiguracion(nuevaConfig);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Configuración</Text>
      
      <View style={[styles.optionCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.optionText, { color: theme.colors.text }]}>Notificaciones</Text>
        <Switch 
          value={configuracion.notificaciones} 
          onValueChange={(value) => toggleConfiguracion('notificaciones', value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={configuracion.notificaciones ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.optionCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.optionText, { color: theme.colors.text }]}>Modo Oscuro</Text>
        <Switch 
          value={theme.isDarkMode} 
          onValueChange={theme.toggleTheme} 
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={theme.isDarkMode ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <View style={[styles.optionCard, { backgroundColor: theme.colors.card }]}>
        <Text style={[styles.optionText, { color: theme.colors.text }]}>Guardar automáticamente</Text>
        <Switch 
          value={configuracion.guardadoAuto} 
          onValueChange={(value) => toggleConfiguracion('guardadoAuto', value)}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={configuracion.guardadoAuto ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>Información</Text>
      <Text style={[styles.infoText, { color: theme.colors.text }]}>EcoQuest v1.0.0</Text>
      <Text style={[styles.infoText, { color: theme.colors.text }]}>Desarrollado con React Native + Expo</Text>
      <Text style={[styles.infoText, { color: theme.colors.text }]}>¡Gracias por usar nuestra app! 🌱</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
  },
  optionCard: {
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
});