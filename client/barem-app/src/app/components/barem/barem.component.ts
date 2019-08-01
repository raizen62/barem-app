import { VictimService } from './../../services/victim.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barem',
  templateUrl: './barem.component.html',
  styleUrls: ['./barem.component.scss']
})
export class BaremComponent implements OnInit {

  constructor(
    private router: Router,
    private victimService: VictimService
  ) { }

  ngOnInit() {
  }

}
