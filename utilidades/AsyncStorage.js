// utilidades/AsyncStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_EXPERIENCIAS = '@experiencias_ecoquest';

// Guardar una nueva experiencia
export const guardarExperiencia = async (experiencia) => {
  try {
    const experienciasExistentes = await obtenerExperiencias();
    const nuevasExperiencias = [...experienciasExistentes, experiencia];
    await AsyncStorage.setItem(CLAVE_EXPERIENCIAS, JSON.stringify(nuevasExperiencias));
    return true;
  } catch (error) {
    console.error('Error al guardar experiencia:', error);
    return false;
  }
};

// Obtener todas las experiencias
export const obtenerExperiencias = async () => {
  try {
    const experienciasString = await AsyncStorage.getItem(CLAVE_EXPERIENCIAS);
    return experienciasString ? JSON.parse(experienciasString) : [];
  } catch (error) {
    console.error('Error al obtener experiencias:', error);
    return [];
  }
};

// Eliminar todas las experiencias (para testing)
export const limpiarExperiencias = async () => {
  try {
    await AsyncStorage.removeItem(CLAVE_EXPERIENCIAS);
    return true;
  } catch (error) {
    console.error('Error al limpiar experiencias:', error);
    return false;
  }
};