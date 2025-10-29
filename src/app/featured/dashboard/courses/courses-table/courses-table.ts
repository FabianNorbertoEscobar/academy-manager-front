import { Component, ViewChild } from '@angular/core';
import { Course, courseColumns } from '../../../../core/services/courses/model/Course';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CoursesService } from '../../../../core/services/courses/courses';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog';

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

  constructor(private courseService: CoursesService, private dialog: MatDialog) {
    this.courseService.courses$.subscribe((courses) => {
      this.dataSource.data = courses;
    });
  }

  ngOnInit() {
    this.courseService.getCourses();
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
