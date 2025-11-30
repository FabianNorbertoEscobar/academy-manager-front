import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../../../../core/services/students/students';
import { StudentsActions } from './students.actions';
import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffect {
  loadStudents$: any;

  constructor(private actions$: Actions, private studentService: StudentsService) {
    this.loadStudents$ = createEffect(() =>
      this.actions$.pipe(
        ofType(StudentsActions.loadStudents),
        concatMap(() =>
          this.studentService.getStudentsForEffect().pipe(
            delay(2000),
            map((students) => StudentsActions.loadStudentsSuccess({ students })),
            catchError((error) => of(StudentsActions.loadStudentsFailure({ error })))
          )
        )
      )
    );
  }
}
