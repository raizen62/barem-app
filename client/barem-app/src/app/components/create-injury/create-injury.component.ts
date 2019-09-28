import { untilDestroyed } from 'ngx-take-until-destroy';
import { BehaviorSubject } from 'rxjs';
import { InjuryService } from './../../services/injury.service';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { MatDialog, MatSidenav } from '@angular/material';
import { Injury } from 'src/app/types/injury';
import { tap, shareReplay } from 'rxjs/operators';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Maneuver } from 'src/app/types/maneuver';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-create-injury',
  templateUrl: './create-injury.component.html',
  styleUrls: ['./create-injury.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateInjuryComponent implements OnInit, OnDestroy, AfterViewInit {

  @Input()
  set injury(injury: Injury) {
    if (injury) {
      this.editInjury$.next(cloneDeep(injury));
      this.setFormFromInjury(cloneDeep(injury));
    }
  }
  editInjury$ = new BehaviorSubject<Injury | null>(null);
  editManeuver$ = new BehaviorSubject<{ maneuver: Maneuver, index: number } | null>(null);
  injuryForm: FormGroup;
  scrolling$ = new BehaviorSubject<boolean>(false);
  loading$ = new BehaviorSubject<boolean>(false);

  @Output() setInjury = new EventEmitter<Injury | null>();
  @Output() backEmitter = new EventEmitter<boolean>();

  @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;
  @ViewChild('screen', { static: false }) screen: ElementRef;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private injuryService: InjuryService,
  ) { }

  ngOnInit() {
    this.injuryForm = this.getInjuryForm();
  }

  private getInjuryForm(): FormGroup {
    return this.formBuilder.group({
      name: this.formBuilder.control(''),
      maneuvers: this.formBuilder.array([])
    });
  }

  private setFormFromInjury(injury: Injury) {
    this.injuryForm.patchValue({name: injury.name});
    this.emptyManeuvers();
    if (injury.maneuvers) {
      for (const maneuver of injury.maneuvers) {
        this.maneuversForms.push(new FormControl(maneuver));
      }
    }
  }

  private emptyManeuvers() {
    while (this.maneuversForms.controls.length > 0) {
      this.maneuversForms.removeAt(0);
    }
  }

  get maneuversForms() {
    return this.injuryForm.get('maneuvers') as FormArray;
  }

  setManeuver(value): void {
    if (value && value.maneuver) {
      const maneuver = this.formBuilder.group({
        description: value.maneuver.description,
        score: this.formBuilder.group(value.maneuver.score)
      });

      if (value.index == null) {
        this.maneuversForms.push(maneuver);
      } else {
        this.maneuversForms.at(value.index).value.description = value.maneuver.description;
        this.maneuversForms.at(value.index).value.score = value.maneuver.score;
      }
    } else if (value && !value.maneuver && value.index != null) {
      this.maneuversForms.removeAt(value.index);
    }
    this.sidenav.close();
  }

  save(): void {
    this.loading$.next(true);
    const editInjury = this.editInjury$.getValue();
    if (editInjury) {
      const injuryWithId: Injury = { ...this.injuryForm.value, _id: editInjury._id };
      this.injuryService.updateInjury(injuryWithId)
        .subscribe(injury => {
          this.setInjury.emit(injuryWithId);
          this.loading$.next(false);
          this.backEmitter.emit();
        });
    } else {
      this.injuryService.postInjury(this.injuryForm.value)
        .subscribe(injury => {
          this.setInjury.emit(injury);
          this.loading$.next(false);
          // this.backEmitter.emit();
        });
    }
  }

  editManeuver(index: number) {
    this.editManeuver$.next({
      maneuver: this.maneuversForms.at(index).value,
      index: index
    });
  }

  back() {
    this.backEmitter.emit();
  }

  close() {
    this.sidenav.close();
  }

  delete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: ' Ești sigur că vrei să ștergi leziunea?',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading$.next(true);
        const editInjury = this.editInjury$.getValue();
        this.injuryService.deleteInjury(editInjury._id).pipe(
          untilDestroyed(this)
        )
        .subscribe(res => {
          this.loading$.next(false);
          this.setInjury.next(null);
        });
      }
    });
  }

  ngAfterViewInit() {
    this.screen.nativeElement.addEventListener('scroll', () => {
      const scrollTop = this.screen.nativeElement.scrollTop;
      const scrolling = this.scrolling$.getValue();
      if (scrollTop > 0 && scrolling === false) {
        this.scrolling$.next(true);
      } else if (scrollTop === 0 && scrolling === true) {
        this.scrolling$.next(false);
      }
    }, true);
  }

  ngOnDestroy() {

  }

}
