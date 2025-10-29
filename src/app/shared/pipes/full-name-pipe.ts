import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {

  transform(student: { firstName: string; lastName: string }): string {
    if (!student) return '';
    return `${student.firstName} ${student.lastName}`;
  }

}
