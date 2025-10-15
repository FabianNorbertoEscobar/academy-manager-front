import { Component } from '@angular/core';
import { Alumno } from '../../core/modelos/alumno.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../../core/confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-alumnos-listado',
  standalone: false,
  templateUrl: './alumnos-listado.html',
  styleUrl: './alumnos-listado.scss'
})
export class AlumnosListado {

  alumnos: Alumno[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', genero: 'Masculino', email: 'juan@mail.com' },
    { id: 2, nombre: 'María', apellido: 'López', genero: 'Femenino', email: 'maria@mail.com' },
    { id: 3, nombre: 'Carlos', apellido: 'Gómez', genero: 'Masculino', email: 'carlos@mail.com' },
    { id: 4, nombre: 'Lucía', apellido: 'Fernández', genero: 'Femenino', email: 'lucia@mail.com' },
    { id: 5, nombre: 'Sofía', apellido: 'Martínez', genero: 'Femenino', email: 'sofia@mail.com' }
  ];

  columnas: string[] = ['seleccion', 'nombre', 'apellido', 'genero', 'email', 'acciones'];
  seleccionados: number[] = [];
  alumnoEditando: Alumno | null = null;
  mostrarFormulario = false;

  constructor(private dialog: MatDialog) { }

  alternarSeleccion(alumno: Alumno): void {
    const index = this.seleccionados.indexOf(alumno.id);
    if (index > -1) this.seleccionados.splice(index, 1);
    else this.seleccionados.push(alumno.id);
  }

  estaSeleccionado(alumno: Alumno): boolean {
    return this.seleccionados.includes(alumno.id);
  }

  crearAlumno(): void {
    this.alumnoEditando = null;
    this.mostrarFormulario = true;
  }

  editarAlumno(alumno: Alumno): void {
    this.alumnoEditando = { ...alumno };
    this.mostrarFormulario = true;
  }

  eliminarAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar este alumno?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.alumnos = this.alumnos.filter(a => a.id !== alumno.id);
        if (this.alumnoEditando?.id === alumno.id) {
          this.mostrarFormulario = false;
          this.alumnoEditando = null;
        }
        this.seleccionados = this.seleccionados.filter(id => id !== alumno.id);
        this.alumnos = [...this.alumnos];
      }
    });
  }

  eliminarSeleccionados(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      data: { titulo: 'Confirmar eliminación', mensaje: '¿Desea eliminar los alumnos seleccionados?' }
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.alumnos = this.alumnos.filter(a => !this.seleccionados.includes(a.id));
        if (this.alumnoEditando && this.seleccionados.includes(this.alumnoEditando.id)) {
          this.mostrarFormulario = false;
          this.alumnoEditando = null;
        }
        this.seleccionados = [];
        this.alumnos = [...this.alumnos];
      }
    });
  }

  cancelarSeleccion(): void {
    this.seleccionados = [];
  }

  alGuardarFormulario(alumno: Alumno): void {
    if (this.alumnoEditando) {
      const index = this.alumnos.findIndex(a => a.id === alumno.id);
      if (index > -1) this.alumnos[index] = alumno;
      this.alumnos = [...this.alumnos];
    } else {
      alumno.id = this.alumnos.length ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
      this.alumnos = [...this.alumnos, alumno];
    }
    this.mostrarFormulario = false;
    this.alumnoEditando = null;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
    this.alumnoEditando = null;
  }
}