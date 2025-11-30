import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared-module';
import { StudentsService } from '../../../../core/services/students/students';
import { Student, Gender } from '../../../../core/services/students/model/Student';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { StudentsTable } from './students-table';

describe('StudentsTable', () => {
  let component: StudentsTable;
  let fixture: ComponentFixture<StudentsTable>;
  let studentsService: jasmine.SpyObj<StudentsService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let mockStore: jasmine.SpyObj<Store>;

  const mockStudents: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: new Date('2000-01-01'), gender: Gender.MALE },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', birthDate: new Date('2001-05-15'), gender: Gender.FEMALE }
  ];

  beforeEach(async () => {
    const studentsServiceSpy = jasmine.createSpyObj('StudentsService', ['getStudents', 'deleteStudent'], {
      students$: new BehaviorSubject(mockStudents)
    });
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    mockStore.select.and.returnValue(new BehaviorSubject(mockStudents));

    await TestBed.configureTestingModule({
      declarations: [StudentsTable],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: StudentsService, useValue: studentsServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Store, useValue: mockStore }
      ]
    })
      .compileComponents();

    studentsService = TestBed.inject(StudentsService) as jasmine.SpyObj<StudentsService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(StudentsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display students in the table', () => {
    expect(component.dataSource.data).toEqual(mockStudents);
  });

  it('should have correct column definitions', () => {
    expect(component.displayedColumns).toBeTruthy();
    expect(component.displayedColumns).toContain('fullName');
    expect(component.displayedColumns).toContain('email');
  });

  it('should call getStudents on initialization', () => {
    component.ngOnInit();
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should open confirmation dialog when deleting a student', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(new BehaviorSubject(false).asObservable());
    dialog.open.and.returnValue(mockDialogRef);

    component.onDeleteStudent(1);

    expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), jasmine.objectContaining({
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este alumno?' }
    }));
  });
});
