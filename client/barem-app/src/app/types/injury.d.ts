import { Maneuver } from "./maneuver";

export interface Injury {
  id?: any;
  nume: string;
  locatie: string[];
  manevre: Maneuver[];
}