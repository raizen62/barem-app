import { Component, OnInit, Input } from '@angular/core';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-injury-list-item',
  templateUrl: './injury-list-item.component.html',
  styleUrls: ['./injury-list-item.component.scss']
})
export class InjuryListItemComponent implements OnInit {

  @Input() injury!: Injury;

  constructor() { }

  ngOnInit() {
  }

}
