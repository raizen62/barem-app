import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminViewCasualtiesComponent} from './admin-view-casualties.component';

describe('AdminViewCasualtiesComponent', () => {
  let component: AdminViewCasualtiesComponent;
  let fixture: ComponentFixture<AdminViewCasualtiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewCasualtiesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewCasualtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
