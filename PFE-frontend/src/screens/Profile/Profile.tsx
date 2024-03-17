import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../../contexts/UserContext";
import ActionButton from "../../components/ActionButton/ActionButton";

const Profile: React.FC = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={{flex: 1, justifyContent: "center", backgroundColor: "#F5F5F5"}}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Votre Profil</Text>

        <View style={styles.profileInfo}>
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.field}>{user?.first_name}</Text>

          <Text style={styles.label}>Prénom:</Text>
          <Text style={styles.field}>{user?.last_name}</Text>

          <Text style={styles.label}>Email:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`mailto:${user?.email}`)}>
            <Text style={styles.link}>{user?.email}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Téléphone:</Text>
          <TouchableOpacity onPress={() => Linking.openURL(`tel:${user?.phone}`)}>
            <Text style={styles.link}>{user?.phone}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Type d'utilisateur:</Text>
          <Text style={styles.field}>
            {user?.is_admin ? "Administrateur" : "Livreur"}
          </Text>
        </View>
        <ActionButton title="Se déconnecter" color="#007BFF" onPress={logout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: 'center',
    marginTop: 55,
    margin: 20,
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
    paddingBottom: 10,
  },
  profileInfo: {
    borderRadius: 8,
    padding: 10,
    paddingBottom: 0,
  },
  label: {
    fontSize: 16,
    color: "gray",
    marginBottom: 4,
    marginTop: 5,
  },
  field: {
    fontSize: 18,
    marginBottom: 8,
  },
  link: {
    fontSize: 18,
    color: "#007BFF",
    marginBottom: 8,
  },
});

export default Profile;
