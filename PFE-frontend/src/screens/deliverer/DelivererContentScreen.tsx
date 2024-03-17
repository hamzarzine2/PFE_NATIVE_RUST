import React, { useContext, useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView, View, ActivityIndicator } from "react-native";
import QuantityLine from "../../components/QuantityLine/QuantityLine";
import { TourContext } from "../../contexts/TourContext";
import { UserContext } from "../../contexts/UserContext";
import { Tour } from "../../models/tour";
import { BoxeContext } from "../../contexts/BoxeContext";
import { Boxe } from "../../models/boxe";
import ActionButton from "../../components/ActionButton/ActionButton";

const DelivererContentScreen: React.FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const { id } = route.params;
  console.log("mon id ", id);

  const { user } = useContext(UserContext);
  const { getToursToday, setDelivererDB } = useContext(TourContext);
  const { getBoxeDeliverer } = useContext(BoxeContext);
  const [boxe, setBoxe] = useState<Boxe[]>([]);
  const [date, setDate] = useState<string>("");
  const [tour, setTour] = useState<Tour | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const toursToday = await getToursToday();
        const fetchedTour = toursToday.find((tour) => tour.tour === id);
        const boxe = await getBoxeDeliverer(id);
        setTour(fetchedTour);
        setDate(fetchedTour?.date ?? "");
        setBoxe(boxe);
      } catch (error) {
        console.error("Error fetching toursToday:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToursToday, id, getBoxeDeliverer]);

  if (loading) {
    // Render loading indicator while fetching data
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handlePress = async () => {
    await setDelivererDB(id, date, user?.user_id);
    navigation.navigate("DelivererTour");
  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>
          Contenu de la tournée de {tour?.geo_zone} du{" "}
          {tour?.date ? new Date(tour?.date).toLocaleDateString() : ""}
        </Text>
        {boxe.map((boxeLine, index) => (
          <QuantityLine key={index} quantity={boxeLine.quantity} label={boxeLine.name} size={boxeLine.size} />
        ))}
        <View style={styles.btn}>
          <ActionButton
            title="Lancer la tournée"
            color="#28A745"
            onPress={async () => {
              await setDelivererDB(id, date, user?.user_id);
              navigation.popToTop();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    margin: 20,
    padding: 10,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center",
  },
  btn: {
    alignItems: "center",
    marginBottom: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#EDBE78",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DelivererContentScreen;
