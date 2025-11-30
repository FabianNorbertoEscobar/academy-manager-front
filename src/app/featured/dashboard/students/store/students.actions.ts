import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Student } from '../../../../core/services/students/model/Student';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: Student[] }>(),
    'Load Students Failure': props<{ error: any }>(),
  },
});
