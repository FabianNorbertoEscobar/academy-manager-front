import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing-module';
import { Courses } from './courses';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesForm } from './courses-form/courses-form';
import { SharedModule } from '../../../shared/shared-module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoursesService } from '../../../core/services/courses/courses';
import { CoursesEffect } from './store/courses.effects';
import { coursesFeature } from './store/courses.reducer';

@NgModule({
  declarations: [
    Courses,
    CoursesTable,
    CoursesForm
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    StoreModule.forFeature(coursesFeature),
    EffectsModule.forFeature([CoursesEffect]),
  ],
  providers: [CoursesService],
})
export class CoursesModule { }
