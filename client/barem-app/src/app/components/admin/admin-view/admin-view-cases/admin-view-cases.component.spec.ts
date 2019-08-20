import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminViewCasesComponent} from './admin-view-cases.component';

describe('AdminViewCasesComponent', () => {
  let component: AdminViewCasesComponent;
  let fixture: ComponentFixture<AdminViewCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewCasesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
