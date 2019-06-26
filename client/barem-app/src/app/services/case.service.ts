import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Case } from '../types/case';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  case: Case = {
    numberOfVictims: 3,
    context: 'Cutremur',
    victims: []
  }

  constructor(
    private http: HttpClient
  ) { }

  getCase():Observable<Case>{
    return of(this.case);
  }

  patchCase(caseUpdate: Partial<Case>):Observable<Case>{

    this.case = {
      ...this.case,
      ...caseUpdate
    };

    return of(this.case);
  }

}
