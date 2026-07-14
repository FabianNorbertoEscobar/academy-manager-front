import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Courses } from './courses';
import { CoursesForm } from './courses-form/courses-form';
import { CoursesTable } from './courses-table/courses-table';
import { CourseDetail } from './course-detail/course-detail';

const routes: Routes = [
  {
    path: '',
    component: Courses,
    children: [
      {
        path: '',
        component: CoursesTable,
      },
      {
        path: 'create',
        component: CoursesForm,
      },
      {
        path: 'edit/:id',
        component: CoursesForm,
      },
      {
        path: 'detail/:id',
        component: CourseDetail,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
