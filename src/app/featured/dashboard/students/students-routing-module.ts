import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Students } from './students';
import { StudentsForm } from './students-form/students-form';
import { StudentsTable } from './students-table/students-table';

const routes: Routes = [
  {
    path: '',
    component: Students,
    children: [
      {
        path: '',
        component: StudentsTable
      },
      {
        path: 'create',
        component: StudentsForm
      },
      {
        path: 'edit/:id',
        component: StudentsForm
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
