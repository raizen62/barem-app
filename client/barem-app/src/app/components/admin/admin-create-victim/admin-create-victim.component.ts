import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {InjuryService} from 'src/app/services/injury.service';
import {Observable} from 'rxjs';
import {map, startWith, tap} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-admin-create-victim',
  templateUrl: './admin-create-victim.component.html',
  styleUrls: ['./admin-create-victim.component.scss']
})
export class AdminCreateVictimComponent implements OnInit {
  victimForm = this.fb.group({
    name: [''],
    age: [''],
    details: [''],
    context: this.fb.array([
      this.fb.control('')
    ]),
    injuries: this.fb.array([
      this.fb.control('')
    ])
  });

  injuriesResults;

  ngOnInit() {
    this.injuryService.getInjuries().subscribe(data => this.injuriesResults = data);
  }

  get context() {
    return this.victimForm.get('context') as FormArray;
  }

  get injuries() {
    return this.victimForm.get('injuries') as FormArray;
  }

  constructor(private fb: FormBuilder, private injuryService: InjuryService, private _snackBar: MatSnackBar) {
  }

  addContext() {
    this.context.push(this.fb.control(''));
  }

  removeContext(index) {
    this.context.removeAt(index);
  }

  addInjury() {
    this.injuries.push(this.fb.control(''));
  }

  removeInjury(index) {
    this.injuries.removeAt(index);
  }

  onSubmit() {
    this.injuryService.addVictim(this.victimForm.value).subscribe(victim => {
      this._snackBar.open(`Victim code is ${victim._id}`);
    });
    this.victimForm.reset();
  }
}
