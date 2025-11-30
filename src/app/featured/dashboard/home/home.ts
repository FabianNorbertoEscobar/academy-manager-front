import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../core/store';
import { selectUser } from '../../../core/store/auth/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user$: Observable<any>;

  totalCourses = 0;
  totalStudents = 0;
  emptyCourses = 0;
  endingSoonCourses = 0;
  incompleteStudents = 0;
  inactiveCourses = 0;
  studentsWithoutCourse = 0;
  scheduledCourses = 0;
  startingSoonCourses = 0;

  constructor(private store: Store<RootState>, private router: Router) {
    this.user$ = this.store.select(selectUser);

    this.loadDashboardData();
  }

  loadDashboardData() {
    this.totalCourses = 12;
    this.totalStudents = 80;
    this.emptyCourses = 3;
    this.endingSoonCourses = 2;
    this.incompleteStudents = 5;
    this.inactiveCourses = 1;
    this.studentsWithoutCourse = 7;
    this.scheduledCourses = 5;
    this.startingSoonCourses = 3;
  }

  goToCreateCourse() {
    this.router.navigate(['/dashboard/courses/create']);
  }

  goToCreateStudent() {
    this.router.navigate(['/dashboard/students/create']);
  }

  goToCourses() {
    this.router.navigate(['/dashboard/courses']);
  }

  goToStudents() {
    this.router.navigate(['/dashboard/students']);
  }
}
