export interface Student {
  id: number | string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  email: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export const studentColumns: string[] = [
  'id',
  'fullName',
  /*   'firstName',
    'lastName',*/
  'gender',
  'birthDate',
  'email',
  'actions',
];
