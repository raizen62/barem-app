import { Manoeuvre } from './manoeuvre.d';
export interface Victim {
    _id?: any,
    name: string,
    age: number,
    context: string[],
    lesions: Manoeuvre[]
}