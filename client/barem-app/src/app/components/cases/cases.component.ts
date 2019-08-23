import { CaseService } from 'src/app/services/case.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Case } from 'src/app/types/case';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  cases$: Observable<Case[]>

  constructor(
    private caseService: CaseService
  ) { }

  ngOnInit() {
    this.cases$ = this.caseService.getCases();
  }

}
