import { Component, ViewChild } from '@angular/core';
import { Student, studentColumns } from '../../../../core/services/students/model/Student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { StudentsService } from '../../../../core/services/students/students';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../confirmation-dialog/confirmation-dialog';

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

  constructor(private studentsService: StudentsService, private dialog: MatDialog) {
    this.studentsService.students$.subscribe((students) => {
      this.dataSource.data = students;
    });
  }

  ngOnInit() {
    this.studentsService.getStudents();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onDeleteStudent(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este alumno?' },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.studentsService.deleteStudent(id);
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
