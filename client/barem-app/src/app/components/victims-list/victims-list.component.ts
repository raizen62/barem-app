import { switchMap, map } from 'rxjs/operators';
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
  pickedVictims$: Observable<Victim[]>;
  pickedVictims: Victim[] = [];

  constructor(
    private caseService: CaseService
  ) { }

  ngOnInit() {

    this.case$ = this.caseService.getCase();
  
    this.case$.pipe(
      untilDestroyed(this)
    )
      .subscribe(res => {
        this.case = res;
      })

    this.victims$ = this.caseService.getVictims(this.case.context? this.case.context : '');

    this.pickedVictims$ = this.victims$.pipe(
      map(victims => {
        let pickedVictims: Victim[] = [];

        for (let i = 0; i < this.case.numberOfVictims ? this.case.numberOfVictims : 0; i++) {
          let rand = Math.floor((Math.random() * victims.length));
          pickedVictims.push(victims[rand]);
          victims.splice(rand, 1);
        }

        console.log(pickedVictims);
        this.pickedVictims = pickedVictims;

        return pickedVictims;
      })
    );

  }

  refreshPicks(){
    this.pickedVictims$ = this.victims$.pipe(
      map(victims => {
        let pickedVictims: Victim[] = [];

        for (let i = 0; i < this.case.numberOfVictims ? this.case.numberOfVictims : 0; i++) {
          let rand = Math.floor((Math.random() * victims.length));
          pickedVictims.push(victims[rand]);
          victims.splice(rand, 1);
        }

        return pickedVictims;
      })
    );
  }

  refreshPick(id: String){
    this.pickedVictims$ = this.victims$.pipe(
      map(victims => {
        let picked = false;

        // pick another victim
        while (picked == false) {
          let rand = Math.floor((Math.random() * victims.length));

          // check if the victim is already picked
          if (this.pickedVictims.filter(victim => { return victim._id == victims[rand]._id }).length <= 0) {
            // change the old victim with the new one
            this.pickedVictims = this.pickedVictims.map(victim => {
              if (victim._id == id)
                return victims[rand];
              return victim;
            })
            picked = true;
          } else {
            // remove the bad pick for better performance
            victims.splice(rand, 1);
          }
        }

        return this.pickedVictims;
      })
    );

  }

  ngOnDestroy(){

  }

}
