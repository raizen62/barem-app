import { Injury } from './injury';
export interface Victim {
  _id?: any;
  name?: string;
  age?: number;
  context?: string[];
  injuries: Injury[];
  details?: string;
}