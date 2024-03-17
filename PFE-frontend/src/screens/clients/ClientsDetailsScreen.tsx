import React from 'react';
import { Text, View, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deleteClient } from '../../services/clientService';
import OrderList from '../../components/OrderList/OrderList';
import ActionButton from '../../components/ActionButton/ActionButton';
import { Client } from '../../models/Client';
import ClientTourSelector from '../../components/ClientTourSelector/ClientTourSelector';

const ClientDetailsScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params as { client: Client};

  const handleDeletePress = () => {
    Alert.alert(
      "Supprimer le client",
      "Êtes-vous sûr de vouloir supprimer ce client ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { 
          text: "Supprimer", 
          onPress: async () => {
            await deleteClient(client);
            navigation.goBack();
          } 
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client.name}</Text>
      <Text style={styles.subtitle}>Adresse : {client.address}</Text>
      <ClientTourSelector client={client} />
      <OrderList client={client} />
      <ActionButton title="Supprimer le client" color="#DC3545" onPress={handleDeletePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
  },
});

export default ClientDetailsScreen;
