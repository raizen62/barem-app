import { CaseService } from './../../services/case.service';
import { VictimService } from './../../services/victim.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map, tap, switchMap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Case } from 'src/app/types/case';
import { Victim } from 'src/app/types/victim';
import { Maneuver } from 'src/app/types/maneuver';
import { InjuryService } from 'src/app/services/injury.service';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-barem',
  templateUrl: './barem.component.html',
  styleUrls: ['./barem.component.scss']
})
export class BaremComponent implements OnInit {

  case$: Observable<Case>;
  victim$: Observable<Victim>;
  baremStart$: Observable<Injury[]>;
  baremEnd$: Observable<Injury[]>;

  score: number = 0;
  totalScore: number = 0;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private victimService: VictimService,
    private caseService: CaseService,
    private injuryService: InjuryService
  ) { }

  ngOnInit() {
    this.case$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.caseService.getCaseByCode(params.id);
      })
    );

    this.victim$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        return this.victimService.getVictim(params.victimId).pipe(
          tap(victim => {
            this.calculateTotalScore(victim.injuries);
          })
        );
      }),
      shareReplay(1)
    );

    this.baremStart$ = this.injuryService.getDefaultInjuries().pipe(
      map(injuries => {
        injuries.splice(2,2);
        this.calculateTotalScore(injuries);
        return injuries;
      }),
      shareReplay(1)
    );
    this.baremEnd$ = this.injuryService.getDefaultInjuries().pipe(
      map(injuries => {
        injuries.splice(0,2);
        this.calculateTotalScore(injuries);
        return injuries;
      }),
      shareReplay(1)
    );
  }

  calculateScore(score: number): void {
    this.score += score;
  }

  calculateTotalScore(injuries: Injury[]): void{
    injuries.map(injury => injury.manevre.map(maneuver => this.totalScore += maneuver.punctajMaxim));
  }

}
