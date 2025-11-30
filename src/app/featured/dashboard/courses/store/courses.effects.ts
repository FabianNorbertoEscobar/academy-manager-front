import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CoursesService } from '../../../../core/services/courses/courses';
import { CoursesActions } from './courses.actions';
import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CoursesEffect {
  loadCourses$: any;

  constructor(private actions$: Actions, private courseService: CoursesService) {
    this.loadCourses$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CoursesActions.loadCourses),
        concatMap(() =>
          this.courseService.getCoursesForEffect().pipe(
            delay(2000),
            map((courses) => CoursesActions.loadCoursesSuccess({ courses })),
            catchError((error) => of(CoursesActions.loadCoursesFailure({ error })))
          )
        )
      )
    );
  }
}
