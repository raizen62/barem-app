import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminViewInjuriesComponent} from './admin-view-injuries.component';

describe('AdminViewInjuriesComponent', () => {
  let component: AdminViewInjuriesComponent;
  let fixture: ComponentFixture<AdminViewInjuriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewInjuriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewInjuriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
