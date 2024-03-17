import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Client } from '../../models/Client';
import ActionButton from '../ActionButton/ActionButton';

interface ToursChooseLineProps {
  id : number;
  title?: string;
  creche: Client[];
  navigation?: any;
}

const ToursChooseLine: React.FC<ToursChooseLineProps> = ({id, title, creche, navigation}) => {
  const [isCrecheVisible, setCrecheVisibility] = useState(false);
  const toggleCrecheVisibility = () => {
    setCrecheVisibility(!isCrecheVisible);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.toursChooseLine}>
        <TouchableWithoutFeedback onPress={toggleCrecheVisibility}>
          <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
            {isCrecheVisible ? 
              <Ionicons name="chevron-up" style={styles.icon} /> : 
              <Ionicons name="chevron-down" style={styles.icon} />
            }
            <View style={{ marginTop: -20 }}>
              <ActionButton title="Choisir" color="#28A745" onPress={() => {
                console.log(id);
                navigation.navigate('DelivererContent',{id : id} )
              }}/>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {isCrecheVisible && (
          <View style={styles.crecheContainer}>
            <Text style={styles.crecheHeader}>Crèches : </Text>
            {creche.map((creche, index) => (
              <Text style={styles.crecheLine} key={index}>
                {creche.name}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toursChooseLine: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    width: "60%",
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  icon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  crecheContainer: {
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  crecheHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  crecheLine: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default ToursChooseLine;
