import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Courses } from './courses';

describe('Courses', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Courses],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Courses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
