import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../../../shared/shared-module';
import { CoursesService } from '../../../../core/services/courses/courses';
import { Course, CourseStatus } from '../../../../core/services/courses/model/Course';
import { BehaviorSubject } from 'rxjs';

import { CoursesTable } from './courses-table';

describe('CoursesTable', () => {
  let component: CoursesTable;
  let fixture: ComponentFixture<CoursesTable>;
  let coursesService: jasmine.SpyObj<CoursesService>;
  let dialog: jasmine.SpyObj<MatDialog>;

  const mockCourses: Course[] = [
    { id: '1', title: 'Angular Basics', description: 'Learn Angular fundamentals', beginDate: new Date('2024-01-01'), endDate: new Date('2024-06-01'), status: CourseStatus.SCHEDULED },
    { id: '2', title: 'TypeScript Advanced', description: 'Advanced TypeScript concepts', beginDate: new Date('2024-02-01'), endDate: new Date('2024-07-01'), status: CourseStatus.SCHEDULED }
  ];

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', ['getCourses', 'deleteCourse'], {
      courses$: new BehaviorSubject(mockCourses)
    });
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [CoursesTable],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    })
      .compileComponents();

    coursesService = TestBed.inject(CoursesService) as jasmine.SpyObj<CoursesService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    fixture = TestBed.createComponent(CoursesTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display courses in the table', () => {
    expect(component.dataSource.data).toEqual(mockCourses);
  });

  it('should have correct column definitions', () => {
    expect(component.displayedColumns).toBeTruthy();
    expect(component.displayedColumns).toContain('title');
    expect(component.displayedColumns).toContain('description');
  });

  it('should call getCourses on initialization', () => {
    component.ngOnInit();
    expect(coursesService.getCourses).toHaveBeenCalled();
  });

  it('should open confirmation dialog when deleting a course', () => {
    const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    mockDialogRef.afterClosed.and.returnValue(new BehaviorSubject(false).asObservable());
    dialog.open.and.returnValue(mockDialogRef);

    component.onDeleteCourse(1);

    expect(dialog.open).toHaveBeenCalledWith(jasmine.any(Function), jasmine.objectContaining({
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este curso?' }
    }));
  });
});
