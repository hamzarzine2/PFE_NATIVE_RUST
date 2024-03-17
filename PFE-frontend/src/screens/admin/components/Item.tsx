import React from "react";
import { Item } from "../../../models/Item";
import { View , Text , StyleSheet} from "react-native";

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={styles.label}>{item.label}</Text>
    {item.size && <Text style={styles.size}>{item.size}</Text>}
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    borderRadius: 10, 
    backgroundColor: "#F5F5F5",  
    marginBottom: 20,
    flexDirection: "row",
  },
  label: {
    color: "#333",
    fontSize: 18,
    fontWeight: "bold",
    width: "95%",
  },
  size :{
    color: "#666",
    fontSize: 16,
    fontStyle: "italic",
  }
});

export default ItemComponent;