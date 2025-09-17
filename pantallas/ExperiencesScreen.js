import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image, ScrollView, Alert, StyleSheet } from 'react-native';
import { obtenerExperiencias, eliminarExperiencia } from '../utilidades/AsyncStorage';//Importa la modificacion de experiencias.
import { useTheme } from '../App.js'; //Importa el tema

export default function ExperiencesScreen({ navigation }) {
  const [experiencias, setExperiencias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [experienciaSeleccionada, setExperienciaSeleccionada] = useState(null);
  const theme = useTheme(); //Usa el tema

  const cargarExperiencias = async () => {
    const datos = await obtenerExperiencias();
    setExperiencias(datos);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarExperiencias);
    return unsubscribe;
  }, [navigation]);

  const abrirDetalles = (experiencia) => {
    setExperienciaSeleccionada(experiencia);
    setModalVisible(true);
  };

  const handleEliminar = async () => {
    if (!experienciaSeleccionada || !experienciaSeleccionada.id) {
      Alert.alert('Error', 'No se puede eliminar: ID no válido');
      return;
    }

    Alert.alert(
      'Eliminar Experiencia',
      '¿Estás seguro de que quieres eliminar esta experiencia?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: async () => {
            try {
              const exito = await eliminarExperiencia(experienciaSeleccionada.id);
              
              if (exito) {
                Alert.alert('Éxito', 'Experiencia eliminada correctamente');
                setModalVisible(false);
                cargarExperiencias();
              } else {
                Alert.alert('Error', 'No se pudo eliminar la experiencia');
              }
            } catch (error) {
              console.error('Error al eliminar:', error);
              Alert.alert('Error', 'Ocurrió un error al eliminar');
            }
          }
        }
      ]
    );
  };

  const renderExperiencia = ({ item }) => (
    <TouchableOpacity onPress={() => abrirDetalles(item)} style={[styles.touchableCard, { backgroundColor: theme.colors.card }]}>
      <View style={styles.tarjeta}>
        <Text style={[styles.fecha, { color: theme.colors.text }]}>{item.fecha}</Text>
        <Text style={[styles.nota, { color: theme.colors.text }]} numberOfLines={2}>{item.nota}</Text>
        <Text style={[styles.detalles, { color: theme.colors.primary }]}>
          {item.foto ? '📸 ' : ''}
          {item.audio ? '🎵 ' : ''}
          {item.ubicacion ? '📍' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.titulo, { color: theme.colors.primary }]}>Mis Experiencias</Text>
      
      <TouchableOpacity 
        style={[styles.botonAgregar, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('NuevaExperiencia')}
      >
        <Text style={styles.textoBotonAgregar}>+ Nueva Experiencia</Text>
      </TouchableOpacity>

      <FlatList
        data={experiencias}
        renderItem={renderExperiencia}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={[styles.listaVacia, { color: theme.colors.text }]}>
            No hay experiencias registradas. ¡Agrega la primera!
          </Text>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.card }]}>
            {experienciaSeleccionada && (
              <ScrollView>
                <Text style={[styles.modalTitulo, { color: theme.colors.primary }]}>Detalles de Experiencia</Text>
                <Text style={[styles.modalFecha, { color: theme.colors.text }]}>{experienciaSeleccionada.fecha}</Text>
                
                <Text style={[styles.modalSubtitulo, { color: theme.colors.primary }]}>Nota:</Text>
                <Text style={[styles.modalNota, { color: theme.colors.text }]}>{experienciaSeleccionada.nota}</Text>

                {experienciaSeleccionada.foto && (
                  <>
                    <Text style={[styles.modalSubtitulo, { color: theme.colors.primary }]}>Foto:</Text>
                    <Image 
                      source={{ uri: experienciaSeleccionada.foto }} 
                      style={styles.modalFoto}
                    />
                  </>
                )}

                {experienciaSeleccionada.ubicacion && (
                  <>
                    <Text style={[styles.modalSubtitulo, { color: theme.colors.primary }]}>Ubicación:</Text>
                    <Text style={[styles.modalUbicacion, { color: theme.colors.text }]}>
                      📍 {experienciaSeleccionada.ubicacion.latitud.toFixed(6)}, 
                      {experienciaSeleccionada.ubicacion.longitud.toFixed(6)}
                    </Text>
                  </>
                )}

                <TouchableOpacity 
                  style={styles.botonEliminar}
                  onPress={handleEliminar}
                >
                  <Text style={styles.textoBotonEliminar}>🗑️ Eliminar Experiencia</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.botonCerrarModal, { backgroundColor: theme.colors.primary }]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.textoBotonCerrar}>Cerrar</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  botonAgregar: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotonAgregar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lista: {
    flexGrow: 1,
  },
  listaVacia: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
  touchableCard: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tarjeta: {
    padding: 16,
  },
  fecha: {
    fontSize: 12,
    marginBottom: 8,
  },
  nota: {
    fontSize: 16,
    marginBottom: 8,
  },
  detalles: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalFecha: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  modalNota: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalFoto: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalUbicacion: {
    fontSize: 14,
    marginBottom: 15,
  },
  botonEliminar: {
    backgroundColor: '#ff4444',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotonEliminar: {
    color: 'white',
    fontWeight: 'bold',
  },
  botonCerrarModal: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotonCerrar: {
    color: 'white',
    fontWeight: 'bold',
  },
});