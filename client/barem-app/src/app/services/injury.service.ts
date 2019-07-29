import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';

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
}
