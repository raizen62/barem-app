import { CaseService } from './../../services/case.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-access-case',
  templateUrl: './access-case.component.html',
  styleUrls: ['./access-case.component.scss']
})
export class AccessCaseComponent implements OnInit {

  caseCode = new FormControl();
  wrongCodeError: boolean = false;

  constructor(
    private caseService: CaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.caseCode.setValue('');
  }

  accessCase(){
    this.caseService.getCaseByCode(this.caseCode.value).pipe(
      untilDestroyed(this)
    ).subscribe(cs => {
      if (cs)
        this.router.navigate(["/case/" + this.caseCode.value]);
      else this.wrongCodeError = true;
    })
  }

  ngOnDestroy(){

  }

}
