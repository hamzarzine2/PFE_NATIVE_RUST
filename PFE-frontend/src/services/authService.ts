import { User } from "../models/user";
import API_URL from "../utils/config";
import axios from "axios";

async function login(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    console.log(`${API_URL}/auth/login`);
    
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const userString = response.data;

    // convert userString to User object the attribute names are the same

    const user: User = {
      email: userString.email,
      first_name: userString.first_name,
      is_admin: userString.is_admin,
      is_verified: userString.is_verified,
      last_name: userString.last_name,
      phone: userString.phone,
      user_id: userString.user_id,
    };
    console.log(user.email);

    return user;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return undefined;
  }
}

// fn register return a promise of id user connected or undefined
async function register(newUserData: User): Promise<number | undefined> {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, newUserData);

    if (response.status !== 201) {
      return undefined;
    }
    const id = response.data;

    return id;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return undefined;
  }
}

export { login, register };
