import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {CaseService} from '../../../services/case.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-create-case',
  templateUrl: './admin-create-case.component.html',
  styleUrls: ['./admin-create-case.component.scss']
})
export class AdminCreateCaseComponent implements OnInit {

  caseForm = this.fb.group({
    victims: this.fb.array([''])
  })

  constructor(private fb: FormBuilder, private caseService: CaseService, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  get victims() {
    return this.caseForm.get('victims') as FormArray;
  }

  addVictim() {
    this.victims.push(this.fb.control(''));
  }

  removeVictim(i) {
    this.victims.removeAt(i);
  }

  onSubmit() {
    this.caseService.postCase(this.caseForm.value).subscribe(newCase => {
      this._snackBar.open(`Case code is ${newCase.caseCode}`);
    });
    this.caseForm.reset();
  }
}
