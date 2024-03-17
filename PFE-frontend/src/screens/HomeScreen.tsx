import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { User } from "../models/user";
import { getUser } from "../utils/auth";
import { UserContext } from "../contexts/UserContext";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const { logout } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      const user: User | null = await getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Screen!</Text>

      {user ? (
        <View style={styles.userContainer}>
          <Text style={styles.welcomeText}>
            Welcome {user.first_name} {user.last_name}
          </Text>
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <Text style={styles.notLoggedInText}>Vous n'êtes pas connecté!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  userContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 8,
  },
  notLoggedInText: {
    fontSize: 18,
  },
});

export default HomeScreen;