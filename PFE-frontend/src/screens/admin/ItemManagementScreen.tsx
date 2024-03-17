import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Item } from "../../models/Item";
import ItemComponent from "./components/Item";
import AddItemModal from "./components/AddItemModal";
import { getAllItems } from "../../services/itemService";

const ItemManagementScreen: React.FC = () => {
  const [itemsList, setItemsList] = useState<Item[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllItems();
    if (data) setItemsList(data);
  };

  const handleAddItemPress = () => {
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.title}>Articles</Text>
          {itemsList.map((item, index) => (
            <ItemComponent key={index} item={item} />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddItemPress}>
        <Ionicons style={{marginRight: -3.5}} name="add" size={50} color="white" />
      </TouchableOpacity>
      <AddItemModal visible={isModalVisible} fetchData={fetchData} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    margin: 20,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
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

export default ItemManagementScreen;
