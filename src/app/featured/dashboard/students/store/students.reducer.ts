import { createFeature, createReducer, on } from '@ngrx/store';
import { Student } from '../../../../core/services/students/model/Student';
import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface StudentsState {
  students: Student[];
  isLoading: boolean;
  error: any;
}

export const initialState: StudentsState = {
  students: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => {
    return {
      ...state,
      isLoading: false,
      students,
    };
  }),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  })
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});
