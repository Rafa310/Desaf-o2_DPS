import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './pantallas/ProfileScreen';

// Importamos nuestras pantallas
import HomeScreen from './pantallas/HomeScreen';
import ExperiencesScreen from './pantallas/ExperiencesScreen';
import MapScreen from './pantallas/MapScreen';
import SettingsScreen from './pantallas/SettingsScreen';
import FormularioExperiencia from './componentes/FormularioExperiencia';

// Crear los navegadores
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Configurar el Bottom Tab Navigator con ÍCONOS
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Inicio') iconName = 'home';
          else if (route.name === 'Experiencias') iconName = 'list';
          else if (route.name === 'Mapa') iconName = 'map';
          else if (route.name === 'Configuración') iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2e8b57',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Experiencias" component={ExperiencesScreen} />
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Configuración" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// Configurar el Stack Navigator
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

// App Principal con Drawer Navigation
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="EcoQuest">
        <Drawer.Screen 
          name="EcoQuest" 
          component={StackNavigator} 
          options={{ title: 'Inicio' }} 
        />
        
        <Drawer.Screen name="Mi Perfil" component={ProfileScreen} />
        <Drawer.Screen name="Cerrar Sesión" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

