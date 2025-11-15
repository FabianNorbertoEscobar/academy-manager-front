import { Injectable } from '@angular/core';
import { Student } from './model/Student';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private students: Student[] = [];
  private studentSubject = new BehaviorSubject<Student[]>([]);
  students$ = this.studentSubject.asObservable();

  private studentsUrl = `${API_URL}/students`;

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  getStudents() {
    this.http.get<Student[]>(this.studentsUrl).subscribe((students) => {
      this.students = students;
      this.studentSubject.next(students);
    });
  }

  getStudent(id: number | string) {
    return this.http.get<Student>(`${this.studentsUrl}/${id}`);
  }

  addStudent(student: Student) {
    const newId = String(Number(this.students[this.students.length - 1].id) + 1);
    student.id = newId;
    this.http.post<Student>(this.studentsUrl, student).subscribe((student) => {
      this.students.push(student);
      this.studentSubject.next([...this.students]);
    });
  }

  updateStudent(student: Student) {
    const updatedStudents = this.students.map((s) => (String(s.id) === String(student.id) ? student : s));
    this.http.put<Student>(`${this.studentsUrl}/${student.id}`, student).subscribe((student) => {
      this.students = updatedStudents;
      this.studentSubject.next(updatedStudents);
    });
  }

  deleteStudent(id: number | string) {
    const updatedStudents = this.students.filter((s) => String(s.id) !== String(id));
    this.http.delete<Student>(`${this.studentsUrl}/${id}`).subscribe(() => {
      this.students = updatedStudents;
      this.studentSubject.next(updatedStudents);
    });
  }
}
