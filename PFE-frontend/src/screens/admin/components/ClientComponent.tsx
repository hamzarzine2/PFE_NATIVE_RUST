import React, { useEffect, useState } from "react";
import { Client } from "../../../models/Client";
import { View, Text, ScrollView, TouchableWithoutFeedback } from "react-native";
import { getBoxForClientInAtour } from "../../../services/boxeService";
import { Boxe } from "../../../models/boxe";
import { getOrderById } from "../../../services/clientService";
import CrecheBoxeRequested from "../../../components/CrecheLine/CrecheBoxeRequested";
import styles from "../../../components/CrecheLine/CrecheLineStyle";
import { AntDesign } from "@expo/vector-icons";
import OpenMapButton from "../../../components/openMapButton/openMapButton";
const ClientComponent: React.FC<{
  client: Client;
  idTour: number;
  date: string;
}> = ({ client, idTour, date }) => {
  const [itemsRequested, setItemsRequested] = useState<Boxe[]>([]);

  const [orderStatus, setOrderStatus] = useState("");

  const [isItemVisible, setisItemVisible] = useState(false);

  const toggleItemVisible = () => {
    setisItemVisible(!isItemVisible);
  };

  useEffect(() => {
    const fetchBox = async () => {
      const fetchedBox = await getBoxForClientInAtour(
        client.client_id,
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
  }, []);

  return (
    <View
      style={{ marginBottom: 10, borderWidth: 1, borderRadius: 5, padding: 10 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Crèche {client.name}</Text>
        <View style={{ flexDirection: "row" }}>
          <OpenMapButton />
          <TouchableWithoutFeedback onPress={toggleItemVisible}>
            <View style={{ marginLeft: 5 }}>
              <AntDesign
                name={isItemVisible ? "minus" : "plus"}
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
        </>
      )}
    </View>
  );
};

export default ClientComponent;
