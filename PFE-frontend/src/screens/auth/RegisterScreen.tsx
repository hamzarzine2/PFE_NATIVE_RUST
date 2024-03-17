import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";
import { User } from "../../models/user";
import { register as registerAPI } from "../../services/authService";
import Logo from "../../components/Logo/Logo";
import KeyboardAvoidingComponent from "../../components/KeyboardAvoiding/KeyboardAvoiding";


const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    Alert.alert(
      "Inscription",
      "Voulez-vous vraiment vous inscrire ?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Confirmer",
          onPress: async () => {
            // si l'utilisateur confirme l'inscription

            console.log("inscription en cours");

            const user: User = {
              first_name: firstname,
              last_name: lastname,
              email,
              password,
              phone,
            };

            // appel à service d'authentification

            const idUserCreated = await registerAPI(user);
            if (idUserCreated) {
              // si l'utilisateur est créé
              navigation.navigate("Login");
            } else {
              alert("Erreur lors de l'inscription");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingComponent>
        <View style={{

          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        
        }}>
          <Logo width={175} height={175} />
          <View style={styles.formContainer}>
            <Text style={styles.title}>Inscrivez-vous</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre prénom"
                onChangeText={(text) => setFirstname(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre nom"
                onChangeText={(text) => setLastname(text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre email"
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre téléphone"
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                returnKeyType="done"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Votre mot de passe"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <Button
              color="#124972"
              title="S'inscrire"
              onPress={handleRegister}
            />

            <Text>
              Vous avez déjà un compte ?
              <Text
                style={{ color: "#124972", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Login")}
              >
                {"  "}
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#D4A866",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#124972",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 5,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
    color: "#124972",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "white",
  },
});

export default RegisterScreen;
