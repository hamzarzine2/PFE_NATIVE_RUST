import React from 'react';
import {  View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuantityLineProps {
  label: string;
  quantity: number;
  size?: string;
}


const QuantityLine : React.FC<QuantityLineProps> = ({ label, quantity, size }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.circleText}>{quantity}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.label}>{label}</Text>
        {size && <Text style={styles.size}>{size}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b0e0e6',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  circle: {
    backgroundColor: '#D4A866',
    borderRadius: 15,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleText:{
      color: '#ffffff',
      fontWeight: 'bold',
      fontSize: 15
  },
  text: {
    marginLeft: 10,
    fontSize: 18
  },
  itemContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
  },
  size :{
    color: "#666",
    fontSize: 16,
    fontStyle: "italic",
  },
});

export default QuantityLine;