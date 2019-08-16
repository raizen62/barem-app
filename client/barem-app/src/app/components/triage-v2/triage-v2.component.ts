import { Component, OnInit } from '@angular/core';
import { TriageCasualty } from 'src/app/types/triage-casualty';
import { Subject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

declare var Chance: any;

@Component({
  selector: 'app-triage-v2',
  templateUrl: './triage-v2.component.html',
  styleUrls: ['./triage-v2.component.scss']
})
export class TriageV2Component implements OnInit {

  triageCasualty: TriageCasualty = {
    name: null,
    age: null,
    breathing: null,
    openAirway: null,
    insufflations: null,
    TRC: null,
    mentalStatus: null,
    injury: null
  };

  resultSubject$: Subject<string> = new Subject<null>();
  result$: Observable<boolean>;
  childAgeThreshold = 12;
  score = {
    correct: 0,
    wrong: 0
  };
  pristine = true;

  openAirway = false;
  insufflations = false;

  chance = new Chance();

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.triageCasualty = this.generateTriageCasualty();
    this.result$ = this.resultSubject$.pipe(
      map(tag => {
        if (tag == null) {
          return null;
        }

        if (this.triageCasualty.tag == tag) {
          if (this.pristine == true) {
            this.score.correct++;
          }
          return true;
        }
        if (this.pristine == true) {
          this.score.wrong++;
        }
        this.pristine = false;
        return false;
      }),
      shareReplay(1)
    )


    // for(let i = 0; i < 20; i++){
    //   console.log(this.chance.weighted([0, this.chance.integer({ min: 0, max: 50})], [1, 1.5]));
    // }
  }

  generate(): void {
    this.triageCasualty = this.generateTriageCasualty();
    this.resultSubject$.next(null);
    this.pristine = true;
    this.openAirway = false;
    this.insufflations = false;
    this._snackBar.dismiss();
  }

  generateTriageCasualty(): TriageCasualty {

    let triageCasualty: TriageCasualty = {};
    triageCasualty.age = this.getRandomArbitrary(1, 45);

    // let breathing = this.getRandomArbitrary(0, 45);
    // triageCasualty.breathing = breathing > 15? breathing : 0;
    triageCasualty.name = this.chance.name({ nationality: 'en' });
    triageCasualty.breathing = this.chance.weighted([0, this.chance.integer({ min: 0, max: 50 })], [1, 1.5]);

    if (triageCasualty.breathing === 0) {
      let rand = this.getRandomArbitrary(0, 1);
      if (rand) {
        triageCasualty.openAirway = true;
        triageCasualty.insufflations = true;
      } else {
        triageCasualty.openAirway = false;

        if (triageCasualty.age < this.childAgeThreshold) {
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
        triageCasualty.injury = this.chance.weighted(['Nu ma doare nimic', 'Fractura inchisa brat', 'Hemoragie', 'Lovitura la cap', 'Luxatie', 'Entorsa'], [5,1, 1, 1, 1, 1]);
      } else {
        triageCasualty.canWalk = false;
        triageCasualty.injury = this.chance.weighted(['Fractura inchisa picior', 'Hemoragie', 'Hemoragie interna', 'Lovitura la cap', 'Luxatie', 'Entorsa'], [2, 2, 1, 1, 1, 1]);
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

  result(result){
    this._snackBar.open(`${result}`, '', { 
      verticalPosition: 'top',
      duration: 3000
    });
  }

  showAirway() {
    this.openAirway = true;
  }

  showInsufflations() {
    this.insufflations = true;
  }

}
