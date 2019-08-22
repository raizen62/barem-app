import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Casualty } from '../types/casualty';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CasualtyService {

  constructor(
    private http: HttpClient
  ) { }

  getChief(): Observable<Casualty> {
    return (this.http.get('../../assets/data/chief-barem.json') as Observable<Casualty>).pipe(
      map(casualty => casualty[0])
    );
  }

  getCasualty(id: string): Observable<Casualty> {
    return this.http.get(`https://barem-dezastre.herokuapp.com/victims/${id}`) as Observable<Casualty>;
  }

  getCasualties(): Observable<Casualty[]> {
    return this.http.get('https://barem-dezastre.herokuapp.com/victims/') as Observable<Casualty[]>;
  }
  
}
