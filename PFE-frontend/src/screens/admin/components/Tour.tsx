import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableWithoutFeedback } from "react-native";
import { Tour } from "../../../models/tour";
import {  ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { getUserById } from "../../../services/usersService";

const TourComponent: React.FC<{ navigation: any; tour: Tour }> = ({
  navigation,
  tour,
}) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const [deliverer, setDeliverer] = useState("Pas encore assigné");

  
  useEffect(() => {
    const fetchDeliverer = async () => {
      if (tour.delivery_person === undefined || tour.delivery_person === null) {
        return;
      }
      try {
        const user = await getUserById(tour.delivery_person);
        if (user === undefined) {
          return;
        }
        setDeliverer(`${user.first_name} ${user.last_name}`);
      } catch (error) {
        console.log("Erreur lors du chargement du livreur:", error);
      }
    };
    fetchDeliverer();
  }, []);

  const pressHandler = (tour: Tour) => {
    navigation.navigate("TourDetail", { tour });
  };

  const toggleIsVisible = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };
  return (
    <View
      style={{ borderWidth: 1, padding: 10, borderRadius: 5, marginTop: 15 }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{}}>
          <Text style={{}}>Zone: {tour.geo_zone}</Text>

          <Text>Livreur : {deliverer}</Text>
        </View>

        <TouchableWithoutFeedback onPress={toggleIsVisible}>
          <View style={{ marginLeft: 5 }}>
            <AntDesign
              name={isDetailsVisible ? "minus" : "plus"}
              size={24}
              color="black"
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      {isDetailsVisible && (
        <>
          <Text>Clients: </Text>
          <ScrollView>
            {tour.clients.map((client, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text>Crèche {client.name}</Text>
              </View>
            ))}
          </ScrollView>
          <Button
            title="Voir details de la tournée"
            onPress={() => pressHandler(tour)}
          />
        </>
      )}
    </View>
  );
};

export default TourComponent;
