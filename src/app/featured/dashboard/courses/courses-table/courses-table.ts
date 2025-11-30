import { Component, ViewChild } from '@angular/core';
import { Course, courseColumns } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../../core/store';
import { CoursesActions } from '../store/courses.actions';
import { selectCourses, selectIsLoading, selectError } from '../store/courses.selectors';

@Component({
  selector: 'app-courses-table',
  standalone: false,
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss',
})
export class CoursesTable {
  displayedColumns: string[] = courseColumns;
  dataSource = new MatTableDataSource<Course>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private courseService: CoursesService, private dialog: MatDialog, private store: Store<RootState>) {
    this.courses$ = this.store.select(selectCourses);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(CoursesActions.loadCourses());

    this.courses$.subscribe({
      next: (courses) => {
        let currentPageSize = this.paginator ? this.paginator.pageSize : undefined;
        this.dataSource.data = courses;
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          if (currentPageSize && this.paginator.pageSize !== currentPageSize) {
            this.paginator._changePageSize(currentPageSize);
          }
        }
      },
      error: (error) => {
        console.error('Error loading courses:', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteCourse(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este curso?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.courseService.deleteCourse(id);
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
