import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const [notificaciones, setNotificaciones] = useState(true);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [guardadoAuto, setGuardadoAuto] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      
      <View style={styles.optionCard}>
        <Text style={styles.optionText}>Notificaciones</Text>
        <Switch 
          value={notificaciones} 
          onValueChange={setNotificaciones}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={notificaciones ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <View style={styles.optionCard}>
        <Text style={styles.optionText}>Modo Oscuro</Text>
        <Switch 
          value={modoOscuro} 
          onValueChange={setModoOscuro}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={modoOscuro ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <View style={styles.optionCard}>
        <Text style={styles.optionText}>Guardar automáticamente</Text>
        <Switch 
          value={guardadoAuto} 
          onValueChange={setGuardadoAuto}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={guardadoAuto ? '#2e8b57' : '#f4f3f4'}
        />
      </View>

      <Text style={styles.sectionTitle}>Información</Text>
      <Text style={styles.infoText}>EcoQuest v1.0.0</Text>
      <Text style={styles.infoText}>Desarrollado con React Native</Text>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginTop: 30,
    marginBottom: 10,
  },
  optionCard: {
    backgroundColor: 'white',
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
    color: '#666',
    marginBottom: 5,
  },
});