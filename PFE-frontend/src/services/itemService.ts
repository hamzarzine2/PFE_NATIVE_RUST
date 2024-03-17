import { Item } from "../models/Item";
import { Boxe } from "../models/boxe";
import API_URL from "../utils/config";
import axios from "axios";

async function getAllItems(): Promise<Item[] | undefined> {
  try {
    console.log("getAllItems : " + API_URL);
    
    const response = await axios.get(`${API_URL}/items/`);

    if (response.status !== 200) {
      return undefined;
    }
    const items : Item[] = response.data;

    return items;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return undefined;
  }
}

async function createItem(item: Item): Promise<Item | undefined> {
  try {
    const response = await axios.post(`${API_URL}/items/`, item);

    if (response.status !== 200) {
      return undefined;
    }
    const newItem : Item = response.data;

    return newItem;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return undefined;
  }
}

async function getItemsLeftForATour(tourId: number , date : string): Promise<Boxe[] | undefined> {
  try {

    const url = `${API_URL}/tours/getQuantityLeft/${date}/${tourId}`;

    console.log("getItemsLeftForATour : " + url);
    
    const response = await axios.get(url);

    if (response.status !== 200) {
      return undefined;
    }
    const items : Boxe[] = response.data;

    return items;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return undefined;
  }
}


export { getAllItems  , createItem , getItemsLeftForATour};