import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alumno } from '../../core/modelos/alumno.model';

@Component({
  selector: 'app-alumnos-abm',
  standalone: false,
  templateUrl: './alumnos-abm.html',
  styleUrl: './alumnos-abm.scss'
})
export class AlumnosAbm implements OnChanges {
  @Input() alumno: Alumno | null = null;
  @Output() save = new EventEmitter<Alumno>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['alumno'] && this.alumno) {
      this.form.patchValue(this.alumno);
    } else {
      this.form.reset();
    }
  }

  guardar(): void {
    if (this.form.valid) {
      this.save.emit(this.form.value);
    }
  }

  cancelar(): void {
    this.cancel.emit();
  }
}