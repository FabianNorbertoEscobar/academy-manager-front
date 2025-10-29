import { Validators } from '@angular/forms';

export const formGroup = {
    id: [''],
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['MALE', [Validators.required]],
    birthDate: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
};
