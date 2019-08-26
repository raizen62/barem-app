import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManeuverCardComponent } from './maneuver-card.component';

describe('ManeuverCardComponent', () => {
  let component: ManeuverCardComponent;
  let fixture: ComponentFixture<ManeuverCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManeuverCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManeuverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
