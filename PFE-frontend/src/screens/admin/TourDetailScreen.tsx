import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import { Tour } from "../../models/tour";
import { useRoute } from "@react-navigation/native";
import { getOrders as getOrdersApi } from "../../services/toursManagementService";
import { Order } from "../../models/order";
import { getUserById } from "../../services/usersService";
import ClientComponent from "./components/ClientComponent";
import { ScrollView } from "react-native-gesture-handler";
import { Boxe } from "../../models/boxe";
import { getItemsLeftForATour } from "../../services/itemService";
import CarouselComponent from "../../components/CarouselComponent/CarouselComponent";

const TourDetailScreen: React.FC = () => {
  const [deliverer, setDeliverer] = useState("Pas encore assigné");
  //@ts-ignore
  const tour = useRoute().params?.tour as Tour;

  const [itemsLeft, setItemsLeft] = useState<Boxe[]>([]);
  // recuperer les  commandes de la tournée pour chaque client
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
      // récupérer les items restants pour la tournée
      const fetchedItemsLeft = await getItemsLeftForATour(tour.tour, tour.date);
      if (fetchedItemsLeft === undefined) {
        return;
      }
      setItemsLeft(fetchedItemsLeft);
    };
    fetchDeliverer();
  }, []);

  return (
    <View style={{ margin: 5, padding: 5 }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Tournée du {new Date(tour.date).toLocaleDateString()} à {tour.geo_zone}
      </Text>
      <Text style={{ marginTop: 10 }}>Livreur : {deliverer}</Text>
      <Text style={{ marginTop: 10, fontWeight: "bold" }}>
        Les articles restants
      </Text>

      <View style={{}}>
        <CarouselComponent items={itemsLeft} />
      </View>

      <Text style={{ marginTop: 50, marginBottom: 20, fontWeight: "bold"  , paddingLeft: 20}}>
        {" "}
        Les crèches à livrer
      </Text>
      <ScrollView style={{ padding: 20 }}>
        {tour.clients.map((client, index) => (
          <ClientComponent
            key={index}
            client={client}
            idTour={tour.tour}
            date={tour.date}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TourDetailScreen;
