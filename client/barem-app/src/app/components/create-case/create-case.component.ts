import { untilDestroyed } from 'ngx-take-until-destroy';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Case } from 'src/app/types/case';
import { CaseService } from 'src/app/services/case.service';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.scss']
})
export class CreateCaseComponent implements OnInit {

  case$: Observable<Case>;
  case: Case;

  numberOfVictims = new FormControl();
  context = new FormControl();
  options: string[] = ['Cutremur', 'Incendiu', 'Inundatie'];
  filteredOptions: Observable<string[]>;

  constructor(
    private caseService: CaseService
  ) { }

  ngOnInit() {
    this.filteredOptions = this.context.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    
    this.case$ = this.caseService.getCase();
    this.case$.pipe(
      untilDestroyed(this)
    )
    .subscribe(res => {
      console.log(res);
      this.case = res;
      this.setCase();
    })
  }

  setCase(){
    if (this.case.numberOfVictims) {
      this.numberOfVictims.setValue(this.case.numberOfVictims);
    }
    if (this.case.context) {
      this.context.setValue(this.case.context);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  patchCase(){
    this.caseService.patchCase({ 
      numberOfVictims: this.numberOfVictims.value,
      context: this.context.value
    }).pipe(
      untilDestroyed(this)
    )
    .subscribe(res => {
      console.log(res);
    })
  }

  ngOnDestroy(){

  }

}
