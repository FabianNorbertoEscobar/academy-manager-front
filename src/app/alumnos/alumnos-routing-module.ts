import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosAbm } from './alumnos-abm/alumnos-abm';
import { AlumnosListado } from './alumnos-listado/alumnos-listado';

const routes: Routes = [
  { path: '', component: AlumnosListado }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
