import { Component, ViewChild } from '@angular/core';
import { Student, studentColumns } from '../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../../core/store';
import { StudentsActions } from '../store/students.actions';
import { selectStudents, selectIsLoading, selectError } from '../store/students.selectors';

@Component({
  selector: 'app-students-table',
  standalone: false,
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss',
})
export class StudentsTable {
  displayedColumns: string[] = studentColumns;
  dataSource = new MatTableDataSource<Student>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  students$: Observable<Student[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private studentService: StudentsService, private dialog: MatDialog, private store: Store<RootState>) {
    this.students$ = this.store.select(selectStudents);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(StudentsActions.loadStudents());

    this.students$.subscribe({
      next: (students) => {
        let currentPageSize = this.paginator ? this.paginator.pageSize : undefined;
        this.dataSource.data = students;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          if (currentPageSize && this.paginator.pageSize !== currentPageSize) {
            this.paginator._changePageSize(currentPageSize);
          }
        }
      },
      error: (error) => {
        console.error('Error loading students:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteStudent(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este alumno?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.studentService.deleteStudent(id);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
