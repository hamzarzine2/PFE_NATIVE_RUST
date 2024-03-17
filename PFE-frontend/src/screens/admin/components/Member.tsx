import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Membre = ({
  role,
  prenom,
  nom,
  email,
  phoneNumber,
  onSetAdmin,
}: {
  role: string;
  prenom: string;
  nom: string;
  email: string;
  phoneNumber: string;
  onSetAdmin: () => void;
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.iconButton} onPress={toggleExpand}>
        <View style={styles.header}>
          <Text style={styles.role}>{role}</Text>
          <Text style={styles.fullName}>
            {prenom} {nom}
          </Text>
          {expanded ? 
            <Ionicons name="chevron-up" style={styles.icon} /> : 
            <Ionicons name="chevron-down" style={styles.icon} />
          }
        </View>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.details}>
          <Text style={styles.label}>E-mail :</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${email}`)}>
            <Text style={styles.link}>{email}</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection : "row" }}>
            <Text style={styles.label}>Num. tél. : </Text>
            <TouchableOpacity onPress={() => Linking.openURL(`tel:${phoneNumber}`)}>
              <Text style={styles.link}>{phoneNumber}</Text>
            </TouchableOpacity>
          </View>
          {role !== "admin" && (
            <TouchableOpacity onPress={onSetAdmin} style={styles.adminButton}>
              <Text style={styles.adminButtonText}>
                Passer en administrateur
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  role: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
    fontStyle: 'italic',
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  iconButton: {
    // Styles for the expand/collapse button
  },
  icon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    backgroundColor: "#fff",
    marginHorizontal: -5,
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: { height: 0, width: 0 },
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  link: {
    fontSize: 16,
    color: "#007bff",
    marginBottom: 10,
  },
  adminButton: {
    backgroundColor: "#28A745",
    padding: 15,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  adminButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default Membre;
