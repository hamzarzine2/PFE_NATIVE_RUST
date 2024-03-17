import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "../../../models/Item";
import { createItem } from "../../../services/itemService";
import { Picker } from "@react-native-picker/picker";

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  fetchData: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  visible,
  onClose,
  fetchData,
}) => {
  const [newItemLabel, setNewItemLabel] = useState("");
  const [newItemSize, setNewItemSize] = useState("");
  const [added, setAdded] = useState(false);

  const handleAddItem = async () => {
    setAdded(true); 
    if (!added) {
      if (newItemLabel === "") return alert("Veuillez saisir un nom d'article");
      const newItem: Item = {
        label: newItemLabel,
        size: newItemSize === "" ? undefined : newItemSize,
      };

      await createItem(newItem);
      fetchData();
      handleClose();
    }
  };

  const handleClose = () => {
    setNewItemLabel("");
    setNewItemSize("");
    setAdded(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <View style={styles.popupContainer}>
        <View style={styles.popupContent}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle}>Ajouter un article</Text>
            <TouchableOpacity onPress={handleClose} style={styles.popupClose}>
              <Ionicons name="close" size={40} color="red" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nom de l'article"
            value={newItemLabel}
            onChangeText={(text) => setNewItemLabel(text)}
          />
          <Picker style={styles.pickerContainer}
            selectedValue={newItemSize}
            onValueChange={(size) => setNewItemSize(size)}
          >
            <Picker.Item label="Taille (optionnel)" value="" />
            <Picker.Item label="S" value="S" />
            <Picker.Item label="M" value="M" />
            <Picker.Item label="L" value="L" />
            <Picker.Item label="XL" value="XL" />
          </Picker>

          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
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
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
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

export default AddItemModal;
