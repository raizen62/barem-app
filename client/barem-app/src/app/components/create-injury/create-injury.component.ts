import { InjuryService } from './../../services/injury.service';
import { Maneuver } from './../../types/maneuver.d';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-injury',
  templateUrl: './create-injury.component.html',
  styleUrls: ['./create-injury.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInjuryComponent implements OnInit {

  injuryForm: FormGroup;
  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

  editManeuver = null;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private injuryService: InjuryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.initInjuryForm();
  }

  initInjuryForm() {
    this.injuryForm = this.formBuilder.group({
      name: this.formBuilder.control(''),
      maneuvers: this.formBuilder.array([])
    });
  }

  get maneuversForms() {
    return this.injuryForm.get('maneuvers') as FormArray;
  }

  addManeuver(value): void {
    this.editManeuver = null;

    if (value && value.maneuver) {
      const maneuver = this.formBuilder.group({
        description: value.maneuver.description,
        score: this.formBuilder.group(value.maneuver.score)
      });

      if (value.index == null) {
        this.maneuversForms.push(maneuver);
      } else {
        this.maneuversForms.at(value.index).value.description = value.maneuver.description;
        this.maneuversForms.at(value.index).value.score = value.maneuver.score;
      }
    } else if (value && !value.maneuver && value.index != null) {
      this.maneuversForms.removeAt(value.index);
    }
    this.sidenav.close();
  }

  saveInjury(): void {
    // this.injuryService.postInjury(this.injuryForm.value).subscribe(injury => console.log(injury));
    this.router.navigate(['/']);
  }

  setEditManeuver(index: number) {
    this.editManeuver = {
      maneuver: this.maneuversForms.at(index).value,
      index: index
    };
  }

}
