import {Component, OnInit} from '@angular/core';
import {CaseService} from '../../../../services/case.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-admin-view-cases',
  templateUrl: './admin-view-cases.component.html',
  styleUrls: ['./admin-view-cases.component.scss']
})
export class AdminViewCasesComponent implements OnInit {
  cases$;

  constructor(private caseService: CaseService) {
  }

  ngOnInit() {
    this.getCases();
  }

  getCases() {
    this.caseService.getCases()
      .subscribe(data => {
        this.cases$ = data;
      });
  }

  deleteCase(caseCode) {
    for (let i = 0; i < this.cases$.length; i++) {
      if (this.cases$[i].caseCode === caseCode) {
        this.cases$.splice(i, 1);
      }
    }
  }
}
