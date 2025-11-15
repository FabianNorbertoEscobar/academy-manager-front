import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared/shared-module';
import { StudentsService } from '../../../../core/services/students/students';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { StudentsForm } from './students-form';

describe('StudentsForm', () => {
  let component: StudentsForm;
  let fixture: ComponentFixture<StudentsForm>;
  let studentsService: jasmine.SpyObj<StudentsService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    const studentsServiceSpy = jasmine.createSpyObj('StudentsService', ['addStudent', 'updateStudent', 'getStudent']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [StudentsForm],
      imports: [
        ReactiveFormsModule,
        SharedModule
      ],
      providers: [
        { provide: StudentsService, useValue: studentsServiceSpy },
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

    studentsService = TestBed.inject(StudentsService) as jasmine.SpyObj<StudentsService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(StudentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a reactive form with student fields', () => {
    expect(component.createForm).toBeTruthy();
    expect(component.createForm.get('firstName')).toBeTruthy();
    expect(component.createForm.get('lastName')).toBeTruthy();
    expect(component.createForm.get('email')).toBeTruthy();
    expect(component.createForm.get('birthDate')).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    expect(component.createForm.invalid).toBe(true);
  });

  it('should mark form as valid when all required fields are filled', () => {
    component.createForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      birthDate: '2000-01-01',
      gender: 'MALE'
    });

    expect(component.createForm.valid).toBe(true);
  });
});

