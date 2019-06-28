import { Observable } from 'rxjs/internal/Observable';
import { CaseService } from 'src/app/services/case.service';
import { Component, OnInit } from '@angular/core';
import { Case } from 'src/app/types/case';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Victim } from 'src/app/types/victim';

@Component({
  selector: 'app-victims-list',
  templateUrl: './victims-list.component.html',
  styleUrls: ['./victims-list.component.scss']
})
export class VictimsListComponent implements OnInit {

  case$: Observable<Case>
  case: Case;

  victims$: Observable<Victim[]>;
  victims: Victim[];

  constructor(
    private caseService: CaseService
  ) { }

  ngOnInit() {

    this.case$ = this.caseService.getCase();
    this.case$.pipe(
      untilDestroyed(this)
    )
      .subscribe(res => {
        console.log(res);
        this.case = res;
      })
    this.victims$ = this.caseService.getVictims(this.case.context);
    // this.victims$.subscribe( victims => {
      // console.log(victims as string[]);
      // this.victims = victims;
      // this.victims.splice(1,1);
      // console.log(this.victims);
    // });
  }

  ngOnDestroy(){

  }

}
