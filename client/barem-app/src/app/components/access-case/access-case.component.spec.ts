import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessCaseComponent } from './access-case.component';

describe('AccessCaseComponent', () => {
  let component: AccessCaseComponent;
  let fixture: ComponentFixture<AccessCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessCaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
