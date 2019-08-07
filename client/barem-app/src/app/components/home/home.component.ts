import { VictimService } from './../../services/victim.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private victimService: VictimService
  ) { 

  }

  ngOnInit() {
    this.victimService.getVictims({context: 'cutremur', count: 0});
  }

  ngOnDestroy() {

  }

}
