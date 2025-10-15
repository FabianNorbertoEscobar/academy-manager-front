import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosAbm } from './alumnos-abm';

describe('AlumnosAbm', () => {
  let component: AlumnosAbm;
  let fixture: ComponentFixture<AlumnosAbm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlumnosAbm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnosAbm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
