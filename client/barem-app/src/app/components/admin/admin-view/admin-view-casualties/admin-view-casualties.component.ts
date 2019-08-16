import {Component, OnInit} from '@angular/core';
import {VictimService} from "../../../../services/victim.service";

@Component({
  selector: 'app-admin-view-casualties',
  templateUrl: './admin-view-casualties.component.html',
  styleUrls: ['./admin-view-casualties.component.scss']
})
export class AdminViewCasualtiesComponent implements OnInit {
  casualties$;

  constructor(private casualtyService: VictimService) {
  }

  ngOnInit() {
    this.casualtyService.getCasualties().subscribe(data => {
      this.casualties$ = data;
    });
  }

}
