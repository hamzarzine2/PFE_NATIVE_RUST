import API_URL from "../utils/config";
import axios, { AxiosError } from "axios";
import { Tour } from "../models/tour";

async function getTourById(id: number): Promise<any | undefined> {
    try {
      console.log(`${API_URL}/tours/${id}`);
      const response = await axios.get(`${API_URL}/tours/${id}`);
  
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
/* 
async function getAllTours(): Promise<any | undefined> {
    try {
      console.log(`${API_URL}/tours`);
      const response = await axios.get(`${API_URL}/tours`);
  
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
  } */
  
  async function getAllToursToday(): Promise<any | undefined> {
    try {
      console.log(`${API_URL}/tours/toursToday`);
      const response = await axios.get(`${API_URL}/tours/toursToday`);
  
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

  async function getToursByDate(date: string): Promise<Tour[] | undefined> {
    try {
      
      const url = `${API_URL}/tours/getTourDay/${date}`;
      console.log(' get tour by date : ',url);
      
      const response = await axios.get(url);
  
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

  async function getOrders(tour: number,date: string): Promise<any | undefined> {
    try {
      console.log(`${API_URL}/tours/${tour}/${date}`);
      const response = await axios.get(`${API_URL}/tours/${tour}/${date}`);
  
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


/// EN HAUT C A REDA 


async function getAllTours(): Promise<Tour[]> {
  console.log("fetching");

  try {
    const response = await axios.get(`${API_URL}/tours/`);

    if (response.status !== 200) {
      return [];
    }
    const tours = response.data;

    return tours;
  } catch (error) {
    console.log("Une erreur s'est produite :", error);

    return [];
  }
}

async function getAllToursForTodayWithNotDeliverer(): Promise<Tour[]> {
  console.log("test");

  try {
    const response = await axios.get(API_URL + "/tours/getAllNotDelivered");
    const tourData: Tour[] = response.data;
    console.log(tourData);
    return tourData;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}
async function getTourByDelivererId(
  idDeliverer: number
): Promise<Tour | undefined> {
  const url: string = `${API_URL}/tours/getTourForDeliverer/${idDeliverer}`;

  console.log(`Fetching tour with id deliverer ${idDeliverer} at url ${url} :`);

  try {
    const response = await axios.get(url);
    const tourData: Tour = response.data;  
    return tourData;
  } catch (error) {
    console.log("Error fetching tours:", error);
    return undefined;
  }
}
// export { getAllTours};
export { getAllTours, getAllToursForTodayWithNotDeliverer, getTourByDelivererId ,getToursByDate,getOrders ,getAllToursToday};
