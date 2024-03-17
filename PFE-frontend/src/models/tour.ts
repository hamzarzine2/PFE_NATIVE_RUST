/* export type Tour = {
    tour: number;
    delivery_person?: number | null;
    date: string;
  }; */
import { Client } from "./Client";

export type Tour = {
  tour: number;
  delivery_person?: number | null;
  geo_zone? : string;
  Deliverer ?: string;
  date : string;
  clients : Client[];
};
