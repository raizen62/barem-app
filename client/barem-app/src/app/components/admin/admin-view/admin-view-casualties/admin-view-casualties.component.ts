import {Component, OnInit} from '@angular/core';
import { CasualtyService } from 'src/app/services/casualty.service';

@Component({
  selector: 'app-admin-view-casualties',
  templateUrl: './admin-view-casualties.component.html',
  styleUrls: ['./admin-view-casualties.component.scss']
})
export class AdminViewCasualtiesComponent implements OnInit {
  casualties$;

  constructor(private casualtyService: CasualtyService) {
  }

  ngOnInit() {
    this.casualtyService.getCasualties().subscribe(data => {
      this.casualties$ = data;
    });
  }

}
