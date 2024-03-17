import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { User } from "../../models/user";
import Logo from "../../components/Logo/Logo";
import { login as loginApi } from "../../services/authService";

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(UserContext);

  const handleLogin = async () => {
    const user: User | undefined = await loginApi(email, password);

    // if user is undefined, login failed
    if (!user) {
      alert("Vérifiez votre email et votre mot de passe");
    } else {
      if (user.is_verified == false) {
        alert(
          `Ravi de vous voir ${user.first_name} ${user.last_name} ! Votre compte n'est pas encore vérifié, veuillez contacter l'administrateur.`
        );
      } else {
        login(user);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Logo width={175} height={175} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Connectez-vous</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre mot de passe"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>

        <Button color="#D4A866" title="Se connecter" onPress={handleLogin} />

        <Text style={styles.signupText}>
          Vous n'avez pas de compte ?{" "}
          <Text
            style={styles.signupLink}
            onPress={() => navigation.navigate("Register")}
          >
            S'inscrire
          </Text>
        </Text>
      </View>
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
  formContainer: {
    width: "90%",
    backgroundColor: "#124972",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "white",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
  signupText: {
    marginTop: 20,
    fontSize: 16,
    color: "white",
  },
  signupLink: {
    color: "#D4A866",
    fontWeight: "bold",
  },
});

export default LoginScreen;
