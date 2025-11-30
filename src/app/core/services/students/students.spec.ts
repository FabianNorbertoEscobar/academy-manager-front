import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { StudentsService } from './students';
import { Student, Gender } from './model/Student';
import { API_URL } from '../../utils/constants';

describe('Students', () => {
  let service: StudentsService;
  let httpMock: HttpTestingController;
  let mockStore: jasmine.SpyObj<Store>;

  const mockStudents: Student[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: new Date('2000-01-01'), gender: Gender.MALE },
    { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', birthDate: new Date('2001-05-15'), gender: Gender.FEMALE }
  ];

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StudentsService,
        { provide: Store, useValue: mockStore }
      ]
    });

    service = TestBed.inject(StudentsService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne(`${API_URL}/students`);
    req.flush(mockStudents);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch students on initialization', (done) => {
    service.students$.subscribe((students) => {
      expect(students).toEqual(mockStudents);
      done();
    });
  });

  it('should get a student by id', () => {
    const studentId = '1';
    service.getStudent(parseInt(studentId)).subscribe((student) => {
      expect(student).toEqual(mockStudents[0]);
    });

    const req = httpMock.expectOne(`${API_URL}/students/${studentId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudents[0]);
  });

  it('should add a new student', (done) => {
    const newStudent: Student = { id: '3', firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', birthDate: new Date('2002-03-20'), gender: Gender.MALE };

    service.addStudent(newStudent);

    const req = httpMock.expectOne(`${API_URL}/students`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newStudent);
    req.flush(newStudent);

    service.students$.subscribe((students) => {
      expect(students.length).toBe(3);
      expect(students[2]).toEqual(newStudent);
      done();
    });
  });

  it('should update a student', (done) => {
    const updatedStudent: Student = { ...mockStudents[0], firstName: 'Johnny' };

    service.updateStudent(updatedStudent);

    const req = httpMock.expectOne(`${API_URL}/students/${updatedStudent.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedStudent);
    req.flush(updatedStudent);

    service.students$.subscribe((students) => {
      expect(students[0].firstName).toBe('Johnny');
      done();
    });
  });


});
