import { Injectable } from '@angular/core';
import { Course } from './model/Course';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/constants';
import { Store } from '@ngrx/store';
import { RootState } from '../../store';
import { CoursesActions } from '../../../featured/dashboard/courses/store/courses.actions';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private courses: Course[] = [];
  private courseSubject = new BehaviorSubject<Course[]>([]);
  courses$ = this.courseSubject.asObservable();

  private coursesUrl = `${API_URL}/courses`;

  constructor(private http: HttpClient, private store: Store<RootState>) {
    this.getCourses();
  }

  getCoursesForEffect() {
    return this.http.get<Course[]>(this.coursesUrl);
  }

  getCourses() {
    this.http.get<Course[]>(this.coursesUrl).subscribe((courses) => {
      this.courses = courses;
      this.courseSubject.next(courses);
      this.store.dispatch(CoursesActions.loadCoursesSuccess({ courses }));
    });
  }

  getCourse(id: number | string) {
    return this.http.get<Course>(`${this.coursesUrl}/${id}`);
  }

  addCourse(course: Course) {
    const newId = String(Number(this.courses[this.courses.length - 1].id) + 1);
    course.id = newId;
    this.http.post<Course>(this.coursesUrl, course).subscribe((course) => {
      this.courses.push(course);
      this.courseSubject.next([...this.courses]);
      this.store.dispatch(CoursesActions.loadCoursesSuccess({ courses: [...this.courses] }));
    });
  }

  updateCourse(course: Course) {
    const updatedCourses = this.courses.map((c) => (String(c.id) === String(course.id) ? course : c));
    this.http.put<Course>(`${this.coursesUrl}/${course.id}`, course).subscribe((course) => {
      this.courses = updatedCourses;
      this.courseSubject.next(updatedCourses);
      this.store.dispatch(CoursesActions.loadCoursesSuccess({ courses: [...this.courses] }));
    });
  }

  deleteCourse(id: number | string) {
    const updatedCourses = this.courses.filter((c) => String(c.id) !== String(id));
    this.http.delete<Course>(`${this.coursesUrl}/${id}`).subscribe(() => {
      this.courses = updatedCourses;
      this.courseSubject.next(updatedCourses);
      this.store.dispatch(CoursesActions.loadCoursesSuccess({ courses: [...this.courses] }));
    });
  }
}
