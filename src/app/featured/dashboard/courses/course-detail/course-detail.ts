import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../../../core/services/courses/courses';
import { Course, CourseStatus } from '../../../../core/services/courses/model/Course';

@Component({
    selector: 'app-course-detail',
    standalone: false,
    templateUrl: './course-detail.html',
    styleUrl: './course-detail.scss',
})
export class CourseDetail implements OnInit {
    course: Course | null = null;
    courseDuration: number = 0;
    daysRemaining: number = 0;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private coursesService: CoursesService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadCourse(id);
        }
    }

    loadCourse(id: string) {
        this.coursesService.getCourse(id).subscribe({
            next: (course) => {
                this.course = course;
                this.courseDuration = this.calculateDuration(course.beginDate, course.endDate);
                this.daysRemaining = this.calculateDaysRemaining(course.endDate);
            },
            error: (error) => {
                console.error('Error al cargar el curso:', error);
                this.router.navigate(['/dashboard/courses']);
            },
        });
    }

    calculateDuration(beginDate: Date, endDate: Date): number {
        const start = new Date(beginDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    calculateDaysRemaining(endDate: Date): number {
        const today = new Date();
        const end = new Date(endDate);
        const diffTime = end.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    getStatusLabel(status: CourseStatus): string {
        switch (status) {
            case CourseStatus.STARTED:
                return 'En Curso';
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

    getStatusIcon(status: CourseStatus): string {
        switch (status) {
            case CourseStatus.STARTED:
                return 'play_circle';
            case CourseStatus.SCHEDULED:
                return 'schedule';
            case CourseStatus.FINISHED:
                return 'check_circle';
            case CourseStatus.CANCELLED:
                return 'cancel';
            default:
                return 'help';
        }
    }

    getStatusClass(status: CourseStatus): string {
        switch (status) {
            case CourseStatus.STARTED:
                return 'status-started';
            case CourseStatus.SCHEDULED:
                return 'status-scheduled';
            case CourseStatus.FINISHED:
                return 'status-finished';
            case CourseStatus.CANCELLED:
                return 'status-cancelled';
            default:
                return '';
        }
    }

    editCourse() {
        if (this.course) {
            this.router.navigate(['/dashboard/courses/edit', this.course.id]);
        }
    }

    goBack() {
        this.router.navigate(['/dashboard/courses']);
    }
}
