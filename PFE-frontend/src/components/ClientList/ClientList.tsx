import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getAllClients } from '../../services/clientService';
import ClientItem from '../ClientItem/ClientItem';
import { Client } from '../../models/Client';
import AddClientModal from '../AddClientModal/AddClientModal';

const ClientList = () => {
  const isFocused = useIsFocused();
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchClients();
  }, [isFocused]);

  const fetchClients = async () => {
    const clients = await getAllClients();
    setClients(clients);
  };

  const handleAddClientPress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Clients</Text>
            {clients.map((client, index) => (
              <ClientItem key={index} client={client} />
            ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddClientPress}>
        <Ionicons name="person-add" size={35} color="white" />
      </TouchableOpacity>
      <AddClientModal visible={isModalVisible} fetchClients={fetchClients} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    margin: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  header: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingBottom: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    backgroundColor: '#007BFF',
    borderRadius: 50,
  },
});

export default ClientList;
