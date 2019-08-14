import { startWith, map, shareReplay } from 'rxjs/operators';
import { TriageCasualty } from './../../types/triage-casualty.d';
import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss']
})
export class TriageComponent implements OnInit {

  triageCasualty: TriageCasualty = {
    age: null,
    breathing: null,
    openAirway: null,
    insufflations: null,
    TRC: null,
    mentalStatus: null
  };

  resultSubject$: Subject<string> = new Subject<null>();
  result$: Observable<boolean>;
  childAgeThreshold = 12;
  score = {
    correct: 0,
    wrong: 0
  };
  pristine = true;

  constructor() { }

  ngOnInit() {
    this.triageCasualty = this.generateTriageCasualty();
    this.result$ = this.resultSubject$.pipe(
      map(tag => {
        if(tag == null) {
          return null;
        }

        if (this.triageCasualty.tag == tag) {
          if (this.pristine == true) {
            this.score.correct++;
          }
          return true;
        }
        if(this.pristine == true) {
          this.score.wrong++;
        }
        this.pristine = false;
        return false;
      }),
      shareReplay(1)
    )
  }

  generate(): void {
    this.triageCasualty = this.generateTriageCasualty();
    this.resultSubject$.next(null);
    this.pristine = true;
  }

  generateTriageCasualty(): TriageCasualty {

    let triageCasualty: TriageCasualty = {};
    triageCasualty.age = this.getRandomArbitrary(1,45);

    let breathing = this.getRandomArbitrary(0, 45);
    triageCasualty.breathing = breathing > 15? breathing : 0;

    if (triageCasualty.breathing === 0) {
      let rand = this.getRandomArbitrary(0, 1);
      if (rand) {
        triageCasualty.openAirway = true;
        triageCasualty.insufflations = true;
      } else {
        triageCasualty.openAirway = false;

        if (triageCasualty.age < this.childAgeThreshold){
          let rand = this.getRandomArbitrary(0, 1);
          if (rand) {
            triageCasualty.insufflations = true;
          } else {
            triageCasualty.insufflations = false;
          }
        } else {
          triageCasualty.insufflations = false;
        }
      }

      triageCasualty.TRC = 0;
      triageCasualty.mentalStatus = false;
      triageCasualty.canWalk = false;
    } else {
      triageCasualty.openAirway = true;
      triageCasualty.insufflations = true;

      let rand = this.getRandomArbitrary(0, 3, false);
      triageCasualty.TRC = parseFloat(rand);

      rand = this.getRandomArbitrary(0, 1);
      if (rand) {
        triageCasualty.mentalStatus = true;
      } else {
        triageCasualty.mentalStatus = false;
      }

      rand = this.getRandomArbitrary(0, 1);
      if (rand) {
        triageCasualty.canWalk = true;
      } else {
        triageCasualty.canWalk = false;
      }
    }

    triageCasualty.tag = this.calculateTag(triageCasualty);

    console.log(JSON.parse(JSON.stringify(triageCasualty)));

    return triageCasualty;
  }

  getRandomArbitrary(min, max, round = true) {
    if (round) {
      return Math.round(Math.random() * (max - min) + min);
    }
    return (Math.random() * (max - min) + min).toFixed(2);
  }

  calculateTag(triageCasualty: TriageCasualty): string {
    if (triageCasualty.canWalk) {
      return "green";
    }

    if (triageCasualty.breathing === 0) {
      if (triageCasualty.openAirway === false) {
        if (triageCasualty.age < this.childAgeThreshold) {
          if (triageCasualty.insufflations === false) {
            return "black"
          }

          return "red";
        }

        return "black";
      }

      return "red";
    }

    if (triageCasualty.age < this.childAgeThreshold && (triageCasualty.breathing < 15 || triageCasualty.breathing > 40)) {
      return "red";
    }

    if (triageCasualty.breathing > 30) {
      return "red";
    }

    if (triageCasualty.TRC > 2) {
      return "red";
    }

    if (triageCasualty.mentalStatus === false) {
      return "red";
    }

    return "yellow";
  }

  verify(tag: string) {
    this.resultSubject$.next(tag);
  }

}
