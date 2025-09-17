import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Importamos nuestras pantallas
import HomeScreen from './pantallas/HomeScreen';
import ExperiencesScreen from './pantallas/ExperiencesScreen';
import MapScreen from './pantallas/MapScreen';
import SettingsScreen from './pantallas/SettingsScreen';
import ProfileScreen from './pantallas/ProfileScreen';
import FormularioExperiencia from './componentes/FormularioExperiencia';

// Crear los navegadores
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

//CONTEXTO PARA EL TEMA
const ThemeContext = createContext();

//HOOK para usar el tema
export const useTheme = () => useContext(ThemeContext);

//PROVEEDOR DEL TEMA
function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
  background: '#1a2238',    // Azul oscuro 
  text: '#e1e5f2',          // Azul muy claro 
  card: '#2d3a66',          // Azul medio 
  border: '#3f4e7a',        // Azul 
  primary: '#4ecdc4',       // Turquesa para enfasis
} : {
  background: '#f0f8f0',    // Verde claro
  text: '#333333',          // Texto oscuro
  card: '#ffffff',          // Blanco para tarjetas
  border: '#dddddd',        // Gris para bordes
  primary: '#2e8b57',       // Verde principal
}
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

// Configurar el Bottom Tab  con iconos
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

export default function App() {
  return (
    <ThemeProvider> {/* Para envolver toda la app con el tema. */}
      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="EcoQuest"
          screenOptions={{
            drawerActiveTintColor: '#2e8b57',
            drawerInactiveTintColor: '#666',
          }}
        >
          <Drawer.Screen 
            name="EcoQuest" 
            component={StackNavigator} 
            options={{ 
              title: 'Inicio',
              drawerIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              )
            }} 
          />
          
          <Drawer.Screen 
            name="Experiencias" 
            component={ExperiencesScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="list" size={size} color={color} />
              )
            }}
          />
          
          <Drawer.Screen 
            name="Mapa" 
            component={MapScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="map" size={size} color={color} />
              )
            }}
          />
          
          <Drawer.Screen 
            name="Configuración" 
            component={SettingsScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              )
            }}
          />
          
          <Drawer.Screen 
            name="Mi Perfil" 
            component={ProfileScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="person" size={size} color={color} />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}