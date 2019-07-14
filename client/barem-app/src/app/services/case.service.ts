import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Case } from '../types/case';
import { switchMap, map, filter } from 'rxjs/operators';
import { Victim } from '../types/victim';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  case: Case = {
    numberOfVictims: 3,
    context: 'test',
    victims: []
  }

  constructor(
    private http: HttpClient
  ) { }

  getCase():Observable<Case>{
    return of(this.case);
  }

  getVictims(context?: string): Observable<Victim[]>{
    if(context){
      return (this.http.get('../../assets/data/victims.json') as Observable<Victim[]>).pipe(
        map(victims => {
          let filteredVictims = victims.filter(victim => victim.context.includes(context.toLowerCase())? victim : false);
          if(filteredVictims.length)
            return filteredVictims;
          return victims;
        })
      )
    }
    return (this.http.get('../../assets/data/victims.json') as Observable<Victim[]>);
  }

  patchCase(caseUpdate: Partial<Case>):Observable<Case>{

    this.case = {
      ...this.case,
      ...caseUpdate
    };

    return of(this.case);
  }

}
