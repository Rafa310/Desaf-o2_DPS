import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../App.js';

export default function MapScreen() {
  const [ubicacion, setUbicacion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUbicacion(location.coords);
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.titulo, { color: theme.colors.text }]}>Mapa de Experiencias</Text>
      
      {errorMsg ? (
        <Text style={[styles.error, { color: '#ff6b6b' }]}>{errorMsg}</Text>
      ) : ubicacion ? (
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: ubicacion.latitude,
            longitude: ubicacion.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: ubicacion.latitude,
              longitude: ubicacion.longitude,
            }}
            title="Tu ubicación"
            description="Estás aquí"
            pinColor={theme.colors.primary} //Marker con color del tema
          />
        </MapView>
      ) : (
        <Text style={[styles.cargando, { color: theme.colors.text }]}>Cargando mapa...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  mapa: {
    width: Dimensions.get('window').width - 40,
    height: 400,
    borderRadius: 10,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  cargando: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});