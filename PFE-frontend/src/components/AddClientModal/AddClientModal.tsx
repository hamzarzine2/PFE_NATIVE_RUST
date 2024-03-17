// AddClientPopup.tsx
import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '../../services/clientService';

interface AddClientModalProps {
  visible: boolean;
  onClose: () => void;
  fetchClients: () => void;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ visible, onClose, fetchClients }) => {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [added, setAdded] = useState(false);

  const handleAddPress = async () => {
    if (!added) {
      setAdded(true);
      
      if (!nom || !adresse) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      
      await createClient({ name: nom, address: adresse });
      fetchClients();
      handleClose();
    }
  };

  const handleClose = () => {
    setNom('');
    setAdresse('');
    setAdded(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle}>Ajouter un client</Text>
            <TouchableOpacity onPress={handleClose} style={styles.popupClose}>
              <Ionicons name="close" size={40} color="red" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={nom}
            onChangeText={(text) => setNom(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            value={adresse}
            onChangeText={(text) => setAdresse(text)}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
            <Text style={styles.addButtonText}>Ajouter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContent: {
    width: 325,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  popupClose: {
    position: 'absolute',
    top: -9,
    right: -9,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddClientModal;
