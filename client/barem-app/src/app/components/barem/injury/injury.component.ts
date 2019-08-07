import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Injury } from 'src/app/types/injury';

@Component({
  selector: 'app-injury',
  templateUrl: './injury.component.html',
  styleUrls: ['./injury.component.scss']
})
export class InjuryComponent implements OnInit {

  @Input() injury: Injury;
  @Output() scoreEmitter = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  emittScore(score: number): void {
    this.scoreEmitter.emit(score);
  }

}
