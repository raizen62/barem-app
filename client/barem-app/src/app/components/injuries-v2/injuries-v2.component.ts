import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { InjuryService } from 'src/app/services/injury.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { Injury } from 'src/app/types/injury';
import { FormControl } from '@angular/forms';
import { map, withLatestFrom } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-injuries-v2',
  templateUrl: './injuries-v2.component.html',
  styleUrls: ['./injuries-v2.component.scss']
})
export class InjuriesV2Component implements OnInit, AfterViewInit {

  injuries$!: Observable<Injury[]>;
  loading$ = new BehaviorSubject<boolean>(false);
  search = new FormControl('');
  search$ = new BehaviorSubject<string>('');

  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);

  constructor(
    private injuryService: InjuryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.injuries$ = this.getInjuries();
  }

  private getInjuries(): Observable<Injury[]> {
    return this.injuryService.getInjuries().pipe(
      map(injuries => injuries.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }

  back() {
    this.location.back();
  }

  ngAfterViewInit() {
    this.screen.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.screen.nativeElement.scrollTop;
      if (scrollTop > 0 && this.scrolling$.getValue() === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && this.scrolling$.getValue() === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

}
