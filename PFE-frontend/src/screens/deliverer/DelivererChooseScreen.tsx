import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getMonthString } from "../../utils/month";
import ToursChoose from "../../components/toursChoose/toursChoose";

// cette page s'affiche quand le livreur n'a pas de tournée en cours, il a donc le choix entre les tournées du jour
const DelivererChooseScreen: React.FC<{navigation ?: any}> = ({navigation}) => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: number = today.getMonth() + 1; // MONTHS START AT 0
  const day: number = today.getDate();


  return (
    <View style={{flex: 1, backgroundColor: "#F5F5F5"}}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Tournées du {day} {getMonthString(month)} {year}
        </Text>
        <ToursChoose navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 55,
    margin: 20,
    padding: 20,
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
    fontSize: 19,
    fontWeight: "bold",
    paddingBottom: 20,
    alignSelf: "center",
  },
});

export default DelivererChooseScreen;
