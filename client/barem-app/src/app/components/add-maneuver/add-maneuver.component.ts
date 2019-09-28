import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogAddScoreComponent } from '../dialog-add-score/dialog-add-score.component';
import { Maneuver } from 'src/app/types/maneuver';
import { tap, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-add-maneuver',
  templateUrl: './add-maneuver.component.html',
  styleUrls: ['./add-maneuver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddManeuverComponent implements OnInit, OnDestroy {

  @Input()
  set maneuver(maneuver: { maneuver: Maneuver, index: number }) {
    if (maneuver) {
      this.initManeuver();
      this.setFromManeuver(maneuver.maneuver);
      this.editManeuver$.next(maneuver);
    }
  }
  editManeuver$ = new BehaviorSubject <{ maneuver: Maneuver, index: number } | null>(null);

  description = '';
  score = {
    average: {
      0: true,
      1: false,
      2: false,
      3: false,
      4: false
    },
    maximum: {
      1: false,
      2: false,
      4: false,
      8: false
    }
  };

  @Output() setManeuver = new EventEmitter<{ maneuver: Maneuver | null, index: number | null }>();
  @Output() backEmitter = new EventEmitter<boolean>();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  private initManeuver(): void {
    this.description = '';
    // this.getKeys(this.score.average).map(key => this.score.average[key] = false);
    // this.score.average['0'] = true;
    // this.getKeys(this.score.maximum).map(key => this.score.maximum[key] = false);
    // this.editManeuver$.next(null);
    this.score = {
      average: {
        0: true,
        1: false,
        2: false,
        3: false,
        4: false
      },
      maximum: {
        1: false,
        2: false,
        4: false,
        8: false
      }
    };
    this.editManeuver$.next(null);
  }

  private setFromManeuver(maneuver: Maneuver): void {
    this.description = maneuver.description;
    this.setScore(this.score.maximum, maneuver.score.maximum + '');
    if (maneuver.score.average) {
      this.setScore(this.score.average, maneuver.score.average + '');
    } else {
      this.setScore(this.score.average, '0');
    }
  }

  save(): void {
    const score = {
      maximum: this.getScore(this.score.maximum)
    };
    if (!this.score.average['0']) {
      score['average'] = this.getScore(this.score.average);
    }
    const maneuver = {
      description: this.description,
      score
    };

    const editManeuver = this.editManeuver$.getValue();
    if (!editManeuver) {
      this.setManeuver.emit({
        maneuver,
        index: null
      });
    } else {
      this.setManeuver.emit({
        maneuver,
        index: editManeuver.index
      });
    }
    this.initManeuver();
  }

  delete(): void {
    const editManeuver = this.editManeuver$.getValue();
    this.setManeuver.emit({maneuver: null, index: editManeuver.index});
    this.initManeuver();
  }

  getKeys(object): string[] {
    return Object.keys(object);
  }

  setScore(score: any, selectedScore: string): void {
    this.getKeys(score).map(key => score[key] = false);
    score[selectedScore] = true;
  }

  getScore(score: any): number {
    return parseInt(this.getKeys(score).find(key => score[key] === true), 10);
  }

  openAddScoreDialog(type: string): void {
    const dialogRef = this.dialog.open(DialogAddScoreComponent, {
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setScore(this.score[type], result);
      }
    });
  }

  back(): void {
    this.initManeuver();
    this.backEmitter.emit();
  }

  ngOnDestroy() {

  }
}
