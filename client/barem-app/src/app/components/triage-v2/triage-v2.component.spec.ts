import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriageV2Component } from './triage-v2.component';

describe('TriageV2Component', () => {
  let component: TriageV2Component;
  let fixture: ComponentFixture<TriageV2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriageV2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriageV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
