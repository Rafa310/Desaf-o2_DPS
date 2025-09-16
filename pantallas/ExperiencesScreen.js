import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import { obtenerExperiencias } from '../utilidades/AsyncStorage';
import { eliminarExperiencia } from '../utilidades/AsyncStorage';

export default function ExperiencesScreen({ navigation }) {
  const [experiencias, setExperiencias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [experienciaSeleccionada, setExperienciaSeleccionada] = useState(null);

  const cargarExperiencias = async () => {
    const datos = await obtenerExperiencias();
    setExperiencias(datos);
  };

   const handleEliminar = async () => {
    Alert.alert(
      'Eliminar Experiencia',
      '¿Estás seguro de que quieres eliminar esta experiencia?',
     [
       { text: 'Cancelar', style: 'cancel' },
       { 
          text: 'Eliminar', 
          style: 'destructive',
         onPress: async () => {
            const exito = await eliminarExperiencia(experienciaSeleccionada.id);
            if (exito) {
             Alert.alert('Éxito', 'Experiencia eliminada');
              setModalVisible(false);
              cargarExperiencias(); 
           }
         }
       }
     ]
   );
  };



  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarExperiencias);
    return unsubscribe;
  }, [navigation]);

  const abrirDetalles = (experiencia) => {
    setExperienciaSeleccionada(experiencia);
    setModalVisible(true);
  };

  const renderExperiencia = ({ item }) => (
  <TouchableOpacity 
    onPress={() => abrirDetalles(item)}
    style={styles.touchableCard} // ← Agrega este estilo
  >
    <View style={styles.tarjeta}>
      <Text style={styles.fecha}>{item.fecha}</Text>
      <Text style={styles.nota} numberOfLines={2}>{item.nota}</Text>
      <Text style={styles.detalles}>
        {item.foto ? '📸 ' : ''}
        {item.audio ? '🎵 ' : ''}
        {item.ubicacion ? '📍' : ''}
      </Text>
    </View>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Experiencias</Text>
      
      <TouchableOpacity 
        style={styles.botonAgregar}
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
          <Text style={styles.listaVacia}>
            No hay experiencias registradas. ¡Agrega la primera!
          </Text>
        }
      />

      {/* MODAL PARA VER DETALLES */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {experienciaSeleccionada && (
              <ScrollView>
                <Text style={styles.modalTitulo}>Detalles de Experiencia</Text>
                <Text style={styles.modalFecha}>{experienciaSeleccionada.fecha}</Text>
                
                <Text style={styles.modalSubtitulo}>Nota:</Text>
                <Text style={styles.modalNota}>{experienciaSeleccionada.nota}</Text>

                {experienciaSeleccionada.foto && (
                  <>
                    <Text style={styles.modalSubtitulo}>Foto:</Text>
                    <Image 
                      source={{ uri: experienciaSeleccionada.foto }} 
                      style={styles.modalFoto}
                    />
                  </>
                )}

                <TouchableOpacity 
                   style={styles.botonEliminar}
                   onPress={handleEliminar}
                    >
                 <Text style={styles.textoBotonEliminar}>🗑️ Eliminar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.botonCerrarModal}
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
    backgroundColor: '#f0f8f0',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 20,
    textAlign: 'center',
  },
  botonAgregar: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
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
    color: '#666',
    marginTop: 50,
    fontSize: 16,
    fontStyle: 'italic',
  },
  touchableCard: {
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: 'white',
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
    color: '#888',
    fontSize: 12,
    marginBottom: 8,
  },
  nota: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    lineHeight: 20,
  },
  detalles: {
    color: '#2e8b57',
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalFecha: {
    color: '#666',
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalSubtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e8b57',
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
  botonCerrarModal: {
    backgroundColor: '#2e8b57',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  textoBotonCerrar: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  botonEliminar: {
  backgroundColor: '#ff4444',
  padding: 12,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},
textoBotonEliminar: {
  color: 'white',
  fontWeight: 'bold',
},
});