import { Boxe } from "../models/boxe";
import API_URL from "../utils/config";
import axios from "axios";

async function getBoxForTours(id: number) {
  try {

    const response = await axios.get(API_URL + `/boxes/allBoxes/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching boxe:", error);
  }

  return [];
}

async function getBoxForClientInAtour(
  idClient: number,
  idTour: number,
  date: string
): Promise<Boxe[] | undefined> {
  try {
    const url = `${API_URL}/clients/getAllBoxes/${idClient}/${idTour}/${date}`;
    console.log("getBoxForClientInAtour : " + url);
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching boxe:", error);
    return undefined;
  }
}

type BoxeUpdate = {
  order_id: number;
  item: number; // Foreign key
  delivered_qty: number;
};
async function indicateBoxesDelivered(boxes : Boxe[], idOrder : number){
  try {

    console.log("Exemple de boxe envoyer avant changement de type : " , boxes[0]);

    const boxesToUpdate : BoxeUpdate[] = boxes.map((boxe) => { 
      return {
        order_id : boxe.order_id,
        // @ts-ignore
        item : boxe.item_id,
        // @ts-ignore
        delivered_qty: boxe.delivered_qty
      }
    } 
    );
    
    console.log('Exemple de boxe envoyer apres changement de type : ' , boxesToUpdate[0]);
    
    const url = `${API_URL}/boxes/updateBox/${idOrder}`;
    console.log("indicateBoxesDelivered : " + url);

    console.log("Boxe to update : " , boxesToUpdate);
    
    const response = await axios.put(url,boxesToUpdate);
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching boxe:", error);
    return undefined;
  }
}

export { getBoxForTours  , getBoxForClientInAtour , indicateBoxesDelivered};
