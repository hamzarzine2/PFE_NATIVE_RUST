import { User } from "../models/user";
import API_URL from "../utils/config";
import axios, { AxiosError } from "axios";

async function getAllUsers(): Promise<any | undefined> {
  try {
    console.log(`${API_URL}/users`);
    const response = await axios.get(`${API_URL}/users`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erreur axios détectée :", error.message);
      if (error.response) {
        console.error("Réponse d'erreur :", error.response.data);
      }
    } else {
      console.error("Erreur générale :", error);
    }
  }
  return undefined;
}

async function getUserById(id: number): Promise<User | undefined> {
  try {
    console.log(`${API_URL}/users/${id}`);
    const response = await axios.get(`${API_URL}/users/${id}`);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Erreur axios détectée :", error.message);
      if (error.response) {
        console.error("Réponse d'erreur :", error.response.data);
      }
    } else {
      console.error("Erreur générale :", error);
    }
  }
  return undefined;
}


export { getAllUsers , getUserById };
