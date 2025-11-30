import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';

import { CoursesService } from './courses';
import { Course, CourseStatus } from './model/Course';
import { API_URL } from '../../utils/constants';

describe('Courses', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  let mockStore: jasmine.SpyObj<Store>;

  const mockCourses: Course[] = [
    { id: '1', title: 'Angular Basics', description: 'Learn Angular fundamentals', beginDate: new Date('2024-01-01'), endDate: new Date('2024-06-01'), status: CourseStatus.SCHEDULED },
    { id: '2', title: 'TypeScript Advanced', description: 'Advanced TypeScript concepts', beginDate: new Date('2024-02-01'), endDate: new Date('2024-07-01'), status: CourseStatus.SCHEDULED }
  ];

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService,
        { provide: Store, useValue: mockStore }
      ]
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne(`${API_URL}/courses`);
    req.flush(mockCourses);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses on initialization', (done) => {
    service.courses$.subscribe((courses) => {
      expect(courses).toEqual(mockCourses);
      done();
    });
  });

  it('should get a course by id', () => {
    const courseId = '1';
    service.getCourse(parseInt(courseId)).subscribe((course) => {
      expect(course).toEqual(mockCourses[0]);
    });

    const req = httpMock.expectOne(`${API_URL}/courses/${courseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should add a new course', (done) => {
    const newCourse: Course = { id: '3', title: 'React Essentials', description: 'React fundamentals', beginDate: new Date('2024-03-01'), endDate: new Date('2024-08-01'), status: CourseStatus.SCHEDULED };

    service.addCourse(newCourse);

    const req = httpMock.expectOne(`${API_URL}/courses`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCourse);
    req.flush(newCourse);

    service.courses$.subscribe((courses) => {
      expect(courses.length).toBe(3);
      expect(courses[2]).toEqual(newCourse);
      done();
    });
  });

  it('should update a course', (done) => {
    const updatedCourse: Course = { ...mockCourses[0], title: 'Angular Advanced' };

    service.updateCourse(updatedCourse);

    const req = httpMock.expectOne(`${API_URL}/courses/${updatedCourse.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCourse);
    req.flush(updatedCourse);

    service.courses$.subscribe((courses) => {
      expect(courses[0].title).toBe('Angular Advanced');
      done();
    });
  });


});
