import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogAddScoreComponent } from '../dialog-add-score/dialog-add-score.component';
import { Maneuver } from 'src/app/types/maneuver';

@Component({
  selector: 'app-add-maneuver',
  templateUrl: './add-maneuver.component.html',
  styleUrls: ['./add-maneuver.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddManeuverComponent implements OnInit, OnChanges {

  @Input() editManeuver?: { maneuver: Maneuver, index: number };
  @Output() emitManeuver = new EventEmitter<{ maneuver: Maneuver, index: number }>();

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

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addManeuver(): void {
    const maneuver = {
      description: this.description,
      score: null
    };

    maneuver.score = {
      maximum: this.getScore(this.score.maximum)
    };
    if (!this.score.average['0']) {
      maneuver.score['average'] = this.getScore(this.score.average);
    }

    if (!this.editManeuver) {
      this.emitManeuver.emit({
        maneuver,
        index: null
      });
    } else {
      this.emitManeuver.emit({
        maneuver,
        index: this.editManeuver.index
      });
    }
    this.initManeuver();
  }

  deleteManeuver(): void {
    this.emitManeuver.emit({maneuver: null, index: this.editManeuver.index});
    this.initManeuver();
  }

  private getKeys(object): string[] {
    return Object.keys(object);
  }

  private setScore(score: any, selectedScore: string): void {
    this.getKeys(score).map(key => score[key] = false);
    score[selectedScore] = true;
  }

  private getScore(score: any): number {
    return parseInt(this.getKeys(score).find(key => score[key] === true), 10);
  }

  private initManeuver(): void {
    this.description = '';
    this.getKeys(this.score.average).map(key => this.score.average[key] = false);
    this.score.average['0'] = true;
    this.getKeys(this.score.maximum).map(key => this.score.maximum[key] = false);
  }

  private openAddScoreDialog(type: string): void {
    const dialogRef = this.dialog.open(DialogAddScoreComponent, {
      width: '100vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.setScore(this.score[type], result);
      }
    });
  }

  private close(): void {
    this.emitManeuver.emit(null);
    this.initManeuver();
  }

  private setManeuver(maneuver: Maneuver): void {
    this.description = maneuver.description;
    this.setScore(this.score.maximum, maneuver.score.maximum + '');
    if (maneuver.score.average) {
      this.setScore(this.score.average, maneuver.score.average + '');
    } else {
      this.setScore(this.score.average, '0');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.editManeuver.currentValue) {
      this.setManeuver(changes.editManeuver.currentValue.maneuver);
    }
  }
}
