import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { StudentsForm } from './students-form/students-form';
import { StudentsTable } from './students-table/students-table';
import { SharedModule } from '../../../shared/shared-module';

@NgModule({
  declarations: [
    Students,
    StudentsForm,
    StudentsTable
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule
  ]
})
export class StudentsModule { }
