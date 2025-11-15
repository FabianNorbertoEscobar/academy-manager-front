import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { CoursesService } from '../../../../core/services/courses/courses';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { CoursesForm } from './courses-form';

describe('CoursesForm', () => {
  let component: CoursesForm;
  let fixture: ComponentFixture<CoursesForm>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['addCourse', 'updateCourse', 'getCourse']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CoursesForm],
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    })
      .compileComponents();

    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(CoursesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a reactive form with course fields', () => {
    expect(component.createForm).toBeTruthy();
    expect(component.createForm.get('title')).toBeTruthy();
    expect(component.createForm.get('description')).toBeTruthy();
    expect(component.createForm.get('beginDate')).toBeTruthy();
    expect(component.createForm.get('endDate')).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    expect(component.createForm.invalid).toBe(true);
  });

  it('should mark form as valid when all required fields are filled', () => {
    component.createForm.patchValue({
      title: 'Angular Basics',
      description: 'Learn Angular fundamentals',
      beginDate: '2024-01-01',
      endDate: '2024-06-01',
      status: 'SCHEDULED'
    });

    expect(component.createForm.valid).toBe(true);
  });
});

