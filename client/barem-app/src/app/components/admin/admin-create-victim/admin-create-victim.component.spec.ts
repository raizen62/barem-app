import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminCreateVictimComponent} from './admin-create-victim.component';

describe('AdminCreateVictimComponent', () => {
  let component: AdminCreateVictimComponent;
  let fixture: ComponentFixture<AdminCreateVictimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCreateVictimComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateVictimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
