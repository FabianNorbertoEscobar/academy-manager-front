import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../../../core/services/students/students';
import { Student, Gender } from '../../../../core/services/students/model/Student';

@Component({
    selector: 'app-student-detail',
    standalone: false,
    templateUrl: './student-detail.html',
    styleUrl: './student-detail.scss',
})
export class StudentDetail implements OnInit {
    student: Student | null = null;
    studentAge: number = 0;
    photoUrl: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private studentsService: StudentsService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.loadStudent(id);
        }
    }

    loadStudent(id: string) {
        this.studentsService.getStudent(id).subscribe({
            next: (student) => {
                this.student = student;
                this.studentAge = this.calculateAge(student.birthDate);
                this.photoUrl = this.getPhotoUrl(student);
            },
            error: (error) => {
                console.error('Error al cargar el estudiante:', error);
                this.router.navigate(['/dashboard/students']);
            },
        });
    }

    getPhotoUrl(student: Student): string {
        if (student.photoUrl) {
            return student.photoUrl;
        }
        // Generar URL basada en el nombre del alumno
        const fileName = `${student.firstName.toLowerCase()}-${student.lastName.toLowerCase()}.jpg`;
        return `/imgs/${fileName}`;
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

    getGenderLabel(gender: Gender): string {
        switch (gender) {
            case Gender.MALE:
                return 'Masculino';
            case Gender.FEMALE:
                return 'Femenino';
            case Gender.OTHER:
                return 'Otro';
            case Gender.PREFER_NOT_TO_SAY:
                return 'Prefiero no decir';
            default:
                return gender;
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

    editStudent() {
        if (this.student) {
            this.router.navigate(['/dashboard/students/edit', this.student.id]);
        }
    }

    goBack() {
        this.router.navigate(['/dashboard/students']);
    }
}
