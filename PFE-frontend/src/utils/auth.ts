import { User } from "../models/user";
import * as SecureStore from 'expo-secure-store';

const USER_KEY = 'user';

export const saveUser = async (user: User): Promise<void> => {
  try {
    console.log('ajout de l\'utilisateur:', user);
    
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur:", error);
    throw error;
  }
};

export const getUser = async (): Promise<User | null> => {
    try {
        const userString = await SecureStore.getItemAsync(USER_KEY);
        if (userString) {
            return JSON.parse(userString) as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        throw error;
    }
}

export const deleteUser = async (): Promise<void> => {
    try {
        await SecureStore.deleteItemAsync(USER_KEY);
        console.log("logout : user deleted");
        
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur:", error);
        throw error;
    }
}
