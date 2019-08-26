import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInjuryComponent } from './create-injury.component';

describe('CreateInjuryComponent', () => {
  let component: CreateInjuryComponent;
  let fixture: ComponentFixture<CreateInjuryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInjuryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInjuryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
