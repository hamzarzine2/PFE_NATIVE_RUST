import React, { useState, useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import styles from "./CrecheLineStyle";

import { Client } from "../../models/Client";
import { getOrderById } from "../../services/clientService";
import {
  getBoxForClientInAtour,
  indicateBoxesDelivered,
} from "../../services/boxeService";
import { Boxe } from "../../models/boxe";
import CrecheBoxeRequested from "./CrecheBoxeRequested";
import { Ionicons } from "@expo/vector-icons";
import OpenMapButton from "../openMapButton/openMapButton";
import { TourDayDelivererContext } from "../../contexts/TourDayDelivererContext";

const CrecheLine: React.FC<{
  creche: Client;
}> = ({ creche }) => {
  const [isItemVisible, setisItemVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedArticles, setEditedArticles] = useState<Boxe[]>([]);

  const [orderStatus, setOrderStatus] = useState("");
  const [itemsRequested, setItemsRequested] = useState<Boxe[]>([]);

  const { idTour, date, delivered, onDelivered } = useContext(
    TourDayDelivererContext
  );

  const toggleItemVisible = () => {
    setisItemVisible(!isItemVisible);
  };

  React.useEffect(() => {
    const fetchBox = async () => {
      const fetchedBox = await getBoxForClientInAtour(
        creche.client_id,
        idTour,
        date
      );
      if (fetchedBox === undefined) {
        return;
      }
      setItemsRequested(fetchedBox);
      const idOrder = fetchedBox[0].order_id;
      const order = await getOrderById(idOrder);
      if (order === undefined) {
        return;
      }
      setOrderStatus(order.status);
    };
    fetchBox();
  }, [isItemVisible, delivered]);

  const openModal = () => {
    const itemsToDeliver = [...itemsRequested];
    itemsToDeliver.forEach((item) => {
      // @ts-ignore
      item.delivered_qty = item.quantity;
    });
    setEditedArticles(itemsToDeliver);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async () => {
    console.log("Save clicked", editedArticles);
    closeModal();
    await indicateBoxesDelivered(editedArticles, itemsRequested[0].order_id);
    setisItemVisible(false);
    onDelivered();
  };

  const handleQuantityChange = (index: number, newQuantity: string) => {
    const updatedArticles = [...editedArticles];
    // @ts-ignore
    updatedArticles[index].delivered_qty = parseInt(newQuantity, 10) || 0;
    setEditedArticles(updatedArticles);
  };
  return (
    <View style={{ borderWidth: 1, marginBottom: 10, borderRadius: 10 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            alignContent: "flex-start",
          }}
        >
          {creche.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <OpenMapButton />
          <TouchableWithoutFeedback onPress={toggleItemVisible}>
            <View style={{ marginLeft: 5 }}>
              <Ionicons
                name={isItemVisible ? "chevron-up" : "chevron-down"}
                size={24}
                color="black"
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>

      {isItemVisible && (
        <>
          <View style={styles.AllArticleContainer}>
            <Text> Status: {orderStatus}</Text>
            <ScrollView style={{ ...styles.crecheContainer }}>
              {itemsRequested.map((boxe, index) => (
                <CrecheBoxeRequested key={index} boxe={boxe} />
              ))}
            </ScrollView>
          </View>
          {orderStatus === "livre" ? (
              <Text style={{ color: "red" }}>
                Cette commande a déjà été marquée comme livrée
              </Text>
            ) : (
              <Button title="Marquer comme livrée" onPress={openModal} />
            )}
         
        </>
      )}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styless.popupContainer}>
          <View style={styless.popupContent}>
            <View style={styless.popupHeader}>
              <Text style={styless.popupTitle}>
                Confirmer les quantitées livrée
              </Text>
              <TouchableOpacity onPress={closeModal} style={styless.popupClose}>
                <Ionicons name="close" size={40} color="red" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {editedArticles.map((boxe, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    borderBottomColor: "black",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>{boxe.name}</Text>

                  <TextInput
                    style={{
                      height: 30,
                      borderColor: "gray",
                      borderWidth: 1,
                      paddingHorizontal: 10,

                      alignSelf: "flex-end",
                      borderRadius: 5,
                    }}
                    keyboardType="numeric"
                    onChangeText={(text) => handleQuantityChange(index, text)}
                    value={boxe.quantity.toString()}
                    returnKeyType="done"
                  />
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity style={styless.addButton} onPress={handleSave}>
              <Text style={styless.addButtonText}>Confirmer livraison</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styless = StyleSheet.create({
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    width: 325,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  popupClose: {
    position: "absolute",
    top: -9,
    right: -9,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 30,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },

  addButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default CrecheLine;
