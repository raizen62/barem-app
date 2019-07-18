import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCreateCaseComponent} from './admin-create-case.component';

describe('AdminCreateCaseComponent', () => {
  let component: AdminCreateCaseComponent;
  let fixture: ComponentFixture<AdminCreateCaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateCaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
