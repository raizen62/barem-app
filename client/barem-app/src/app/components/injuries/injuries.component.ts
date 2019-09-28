import { FormControl } from '@angular/forms';
import { InjuryService } from 'src/app/services/injury.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Observable, combineLatest, timer, BehaviorSubject } from 'rxjs';
import { Injury } from 'src/app/types/injury';
import { shareReplay, map, switchMap, tap, startWith, filter, debounceTime, withLatestFrom } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-injuries',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(60, style({
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(60, style({
          opacity: 0
        }))
      ])
    ])
  ],
  templateUrl: './injuries.component.html',
  styleUrls: ['./injuries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InjuriesComponent implements OnInit, AfterViewInit {

  injuries$!: Observable<Injury[]>;
  addInjury$ = new BehaviorSubject<boolean>(false);
  selectedInjury$ = new BehaviorSubject<Injury | null>(null);
  loading$ = new BehaviorSubject<boolean>(false);
  searching$ = new BehaviorSubject<boolean>(false);
  search = new FormControl('');
  refresh$ = new BehaviorSubject<null>(null);

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;
  scrolling$ = new BehaviorSubject<boolean>(false);
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  @Output() back = new EventEmitter<boolean>();

  constructor(
    private injuryService: InjuryService
  ) { }

  ngOnInit() {
    this.loading$.next(true);
    this.injuries$ = this.getInjuriesObservable();
  }

  private getInjuriesObservable(): Observable<Injury[]> {
    return combineLatest(
      this.search.valueChanges.pipe(startWith('')),
      this.refresh$
    ).pipe(
      switchMap(([searchText, refresh]) => {
        return this.injuryService.getInjuries().pipe(
          map(injuries => {
            return injuries.filter(injury => injury.name.toLowerCase().includes(searchText.toLowerCase()))
              .sort((a, b) => a.name.localeCompare(b.name));
          })
        );
      }),
      tap(() => this.loading$.next(false)),
      shareReplay(1)
    );
  }

  openCreatedInjury(injury: Injury) {
    this.clearSearch();
    this.refresh$.next(null);
    this.close();
    this.openInjury(injury);
  }

  openInjury(injury: Injury) {
    this.addInjury$.next(false);
    this.selectedInjury$.next(injury);
    this.sidenav.toggle();
  }

  close() {
    this.addInjury$.next(false);
    this.selectedInjury$.next(null);
    this.sidenav.close();
    this.searching$.next(false);
  }

  clearSearch() {
    if (this.search.value !== '') {
      this.search.setValue('');
    }
  }

  focusSearchInput() {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  trackByFn(index, item) {
    return item._id;
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
