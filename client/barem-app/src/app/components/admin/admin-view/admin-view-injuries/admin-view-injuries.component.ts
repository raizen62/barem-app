import {Component, OnInit} from '@angular/core';
import {InjuryService} from "../../../../services/injury.service";

@Component({
  selector: 'app-admin-view-injuries',
  templateUrl: './admin-view-injuries.component.html',
  styleUrls: ['./admin-view-injuries.component.scss']
})
export class AdminViewInjuriesComponent implements OnInit {
  injuries$;

  constructor(private injuryService: InjuryService) {
  }

  ngOnInit() {
    this.injuryService.getInjuries().subscribe(data => {
      this.injuries$ = data;
      console.log(this.injuries$);
    });
  }

}
