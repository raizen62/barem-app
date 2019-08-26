import { InjuryService } from './../../services/injury.service';
import { Maneuver } from './../../types/maneuver.d';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { AddManeuverComponent } from './../add-maneuver/add-maneuver.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-create-injury',
  templateUrl: './create-injury.component.html',
  styleUrls: ['./create-injury.component.scss']
})
export class CreateInjuryComponent implements OnInit {

  maneuver: Maneuver;

  injuryForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private injuryService: InjuryService
  ) { }

  ngOnInit() {
    this.injuryForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      maneuvers: this.formBuilder.array([])
    })

    this.initAddManeuver();
  }

  createInjury(): void {
    console.log(this.injuryForm.value);
  }

  openAddManeuver(): void {
    this.dialog.open(AddManeuverComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      backdropClass: 'full-screen-overlay',
    })
  }

  get maneuversForms() {
    return this.injuryForm.get('maneuvers') as FormArray;
  }

  addManeuver(): void {
    let score = {
      maximum: this.maneuver.score.maximum
    };
    if (this.maneuver.score.average) {
      score['average'] = this.maneuver.score.average;
    }

    const maneuver = this.formBuilder.group({
      description: this.maneuver.description,
      score: this.formBuilder.group(score)
    });

    this.maneuversForms.push(maneuver);
    // console.log(this.injuryForm.value);
  }

  deleteManeuver(i: number): void {
    this.maneuversForms.removeAt(i);
  }

  initAddManeuver(): void {
    this.maneuver = {
      description: '',
      score: {
        maximum: null,
        average: null
      }
    }
  }

  saveInjury(): void {
    this.injuryService.postInjury(this.injuryForm.value).subscribe(injury => console.log(injury));
  }

}
