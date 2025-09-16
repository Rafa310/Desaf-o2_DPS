import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const [ubicacion, setUbicacion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
    <View style={styles.container}>
      <Text style={styles.titulo}>Mapa de Experiencias</Text>
      
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
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
          />
        </MapView>
      ) : (
        <Text style={styles.cargando}>Cargando mapa...</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 15,
    textAlign: 'center',
  },
  mapa: {
    width: Dimensions.get('window').width - 40,
    height: 400,
    borderRadius: 10,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  cargando: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});