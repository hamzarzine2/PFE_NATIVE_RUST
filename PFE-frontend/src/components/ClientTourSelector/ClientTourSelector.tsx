import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Client } from '../../models/Client';
import { getAllTours } from '../../services/toursManagementService';
import { Tour } from '../../models/tour';
import ActionButton from '../ActionButton/ActionButton';
import { updateClient } from '../../services/clientService';

interface ClientTourSelectorProps {
  client: Client;
}

const ClientTourSelector: React.FC<ClientTourSelectorProps> = ({ client }) => {
  const [selectedTour, setSelectedTour] = useState(client.tour);
  const [modified, setModified] = useState(false);
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    const allTours = await getAllTours();
    setTours(allTours);
  };

  const handleUpdateTour = async () => {
    setModified(false);
    client.tour = selectedTour;
    await updateClient(client);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Tournée :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTour}
            onValueChange={(itemValue) => {
              setSelectedTour(itemValue);
              setModified(true);
            }}
          >
            {!client.tour && <Picker.Item label="Sélectionner une tournée" value={null} />}
            {tours.map((tour) => (
              <Picker.Item key={tour.tour} label={tour.geo_zone} value={tour.tour} />
            ))}
          </Picker>
        </View>
      </View>
      
      {modified && selectedTour !== client.tour && 
        <View style={styles.button}>
          <ActionButton title="Confirmer la tournée" color='#28A745' onPress={handleUpdateTour} />
        </View>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  pickerContainer: {
    flex: 1,
    height: 50,
    width: 150,
  },
  button: {
    marginTop: -30,
    marginBottom: 10,
  },
});

export default ClientTourSelector;