import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import { Injury } from '../types/injury';

@Injectable({
  providedIn: 'root'
})
export class InjuryService {
  constructor(private http: HttpClient) {
  }

  getInjuries(): Observable<any> {
    return this.http.get('https://barem-dezastre.herokuapp.com/injuries');
  }

  addVictim(hero) {
    return this.http.post('https://barem-dezastre.herokuapp.com/victims', hero);
  }

  getDefaultInjuries(): Observable<Injury[]> {
    return (this.http.get('../../assets/data/defaultInjuries.json') as Observable<Injury[]>);
  }

  postInjury(injury: Injury): Observable<Injury>{
    return this.http.post(`https://barem-dezastre.herokuapp.com/injuries`, injury) as Observable<Injury>;
  }
}
