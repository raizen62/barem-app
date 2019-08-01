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
    count: 3,
    context: 'cutremur',
    victims: []
  }

  constructor(
    private http: HttpClient
  ) { }

  getCase(): Observable<Case> {
    return of(this.case);
  }

  getCaseByCode(caseCode: string): Observable<Case>{
    return this.http.get(`https://barem-dezastre.herokuapp.com/cases/${caseCode}`).pipe(map(cs => cs[0]));
  }

  postCase(cs: Case): Observable<Case> {
    return this.http.post(`https://barem-dezastre.herokuapp.com/cases`, cs);
  }

  patchCase(caseUpdate: Partial<Case>): Observable<Case> {

    this.case = {
      ...this.case,
      ...caseUpdate
    };

    return of(this.case);
  }

}
