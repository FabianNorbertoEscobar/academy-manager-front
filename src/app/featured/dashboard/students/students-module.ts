import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing-module';
import { Students } from './students';
import { StudentsForm } from './students-form/students-form';
import { StudentsTable } from './students-table/students-table';
import { SharedModule } from '../../../shared/shared-module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StudentsService } from '../../../core/services/students/students';
import { StudentsEffect } from '../students/store/students.effects';
import { studentsFeature } from '../students/store/students.reducer';

@NgModule({
  declarations: [
    Students,
    StudentsForm,
    StudentsTable
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
    StudentsRoutingModule,
    StoreModule.forFeature(studentsFeature),
    EffectsModule.forFeature([StudentsEffect]),
  ],
  providers: [StudentsService],
})
export class StudentsModule { }
