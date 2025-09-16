import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FormularioExperiencia from './componentes/FormularioExperiencia';
// Elimina: import { View, Text } from 'react-native'; (ya no lo necesitas)
import HomeScreen from './pantallas/HomeScreen';
import ExperiencesScreen from './pantallas/ExperiencesScreen';
import MapScreen from './pantallas/MapScreen';
import SettingsScreen from './pantallas/SettingsScreen';

// 1. Crear los navegadores
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 2. Configurar el Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Experiencias" component={ExperiencesScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// 3. Configurar el Stack Navigator
function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="NuevaExperiencia" 
        component={FormularioExperiencia}
        options={{ title: 'Nueva Experiencia' }}
      />
    </Stack.Navigator>
  );
}

// 4. App Principal con Drawer Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="EcoQuest">
        <Drawer.Screen 
          name="EcoQuest" 
          component={StackNavigator} 
          options={{ title: 'Inicio' }} 
        />
        <Drawer.Screen name="Mi Perfil" component={SettingsScreen} />
        <Drawer.Screen name="Cerrar Sesión" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
