import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Registration = ({
  name,
  surname,
  id,
  onAccept,
  onReject,
}: {
  name: string;
  surname: string;
  id: number;
  onAccept: () => void;
  onReject: () => void;
}) => {

  return (
    <View style={styles.registration}>
      <Text style={styles.registrationText}>
        {name} {surname}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onAccept} style={styles.button}>
          <Ionicons name="checkmark" size={24} color="green" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onReject} style={styles.button}>
          <Ionicons name="close" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  registration: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 10,
    paddingLeft: 20,
    marginTop: 10,
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
  },
  registrationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    margin: 5,
  },
});

export default Registration;
