import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../core/store';
import { selectUser } from '../../../core/store/auth/auth.selector';
import { Router } from '@angular/router';
import { CoursesService } from '../../../core/services/courses/courses';
import { StudentsService } from '../../../core/services/students/students';
import { Course, CourseStatus } from '../../../core/services/courses/model/Course';
import { Student, Gender } from '../../../core/services/students/model/Student';

interface DashboardStats {
  totalCourses: number;
  totalStudents: number;
  activeCourses: number;
  scheduledCourses: number;
  finishedCourses: number;
  endingSoonCourses: number;
  maleStudents: number;
  femaleStudents: number;
  otherGenderStudents: number;
  studentsUnder20: number;
  students20to29: number;
  students30to39: number;
  students40Plus: number;
}

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  user$: Observable<any>;

  stats: DashboardStats = {
    totalCourses: 0,
    totalStudents: 0,
    activeCourses: 0,
    scheduledCourses: 0,
    finishedCourses: 0,
    endingSoonCourses: 0,
    maleStudents: 0,
    femaleStudents: 0,
    otherGenderStudents: 0,
    studentsUnder20: 0,
    students20to29: 0,
    students30to39: 0,
    students40Plus: 0,
  };

  recentCourses: Course[] = [];
  recentStudents: Student[] = [];
  courses: Course[] = [];
  students: Student[] = [];

  constructor(
    private store: Store<RootState>,
    private router: Router,
    private coursesService: CoursesService,
    private studentsService: StudentsService
  ) {
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Cargar cursos
    this.coursesService.courses$.subscribe((courses) => {
      this.courses = courses;
      this.calculateCourseStats(courses);
      this.recentCourses = this.getRecentCourses(courses);
    });

    // Cargar estudiantes
    this.studentsService.students$.subscribe((students) => {
      this.students = students;
      this.calculateStudentStats(students);
      this.recentStudents = this.getRecentStudents(students);
    });
  }

  calculateCourseStats(courses: Course[]) {
    this.stats.totalCourses = courses.length;
    this.stats.activeCourses = courses.filter((c) => c.status === CourseStatus.STARTED).length;
    this.stats.scheduledCourses = courses.filter((c) => c.status === CourseStatus.SCHEDULED).length;
    this.stats.finishedCourses = courses.filter((c) => c.status === CourseStatus.FINISHED).length;

    // Cursos que finalizan en los próximos 30 días
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    this.stats.endingSoonCourses = courses.filter((c) => {
      if (c.status !== CourseStatus.STARTED) return false;
      const endDate = new Date(c.endDate);
      return endDate >= today && endDate <= thirtyDaysFromNow;
    }).length;
  }

  calculateStudentStats(students: Student[]) {
    this.stats.totalStudents = students.length;
    this.stats.maleStudents = students.filter((s) => s.gender === Gender.MALE).length;
    this.stats.femaleStudents = students.filter((s) => s.gender === Gender.FEMALE).length;
    this.stats.otherGenderStudents = students.filter(
      (s) => s.gender === Gender.OTHER || s.gender === Gender.PREFER_NOT_TO_SAY
    ).length;

    // Calcular distribución por edad
    const today = new Date();
    students.forEach((student) => {
      const age = this.calculateAge(student.birthDate);
      if (age < 20) {
        this.stats.studentsUnder20++;
      } else if (age >= 20 && age < 30) {
        this.stats.students20to29++;
      } else if (age >= 30 && age < 40) {
        this.stats.students30to39++;
      } else {
        this.stats.students40Plus++;
      }
    });
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  getRecentCourses(courses: Course[]): Course[] {
    return [...courses]
      .sort((a, b) => new Date(b.beginDate).getTime() - new Date(a.beginDate).getTime())
      .slice(0, 3);
  }

  getRecentStudents(students: Student[]): Student[] {
    return [...students]
      .sort((a, b) => Number(b.id) - Number(a.id))
      .slice(0, 3);
  }

  getStatusColor(status: CourseStatus): string {
    switch (status) {
      case CourseStatus.STARTED:
        return 'primary';
      case CourseStatus.SCHEDULED:
        return 'accent';
      case CourseStatus.FINISHED:
        return 'basic';
      case CourseStatus.CANCELLED:
        return 'warn';
      default:
        return 'basic';
    }
  }

  getStatusLabel(status: CourseStatus): string {
    switch (status) {
      case CourseStatus.STARTED:
        return 'En curso';
      case CourseStatus.SCHEDULED:
        return 'Programado';
      case CourseStatus.FINISHED:
        return 'Finalizado';
      case CourseStatus.CANCELLED:
        return 'Cancelado';
      default:
        return status;
    }
  }

  getGenderIcon(gender: Gender): string {
    switch (gender) {
      case Gender.MALE:
        return 'male';
      case Gender.FEMALE:
        return 'female';
      default:
        return 'person';
    }
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

  goToCourseDetail(courseId: number | string) {
    this.router.navigate(['/dashboard/courses/detail', courseId]);
  }

  goToStudentDetail(studentId: number | string) {
    this.router.navigate(['/dashboard/students/detail', studentId]);
  }
}
