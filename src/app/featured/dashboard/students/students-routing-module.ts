import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Students } from './students';
import { StudentsForm } from './students-form/students-form';
import { StudentsTable } from './students-table/students-table';
import { StudentDetail } from './student-detail/student-detail';

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
      {
        path: 'detail/:id',
        component: StudentDetail
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
