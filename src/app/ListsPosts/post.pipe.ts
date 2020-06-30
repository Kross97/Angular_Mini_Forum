import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isUser',
})

export class UserPipe implements PipeTransform {
  transform(user: any): string {
    return user ? user.name : '';
  }
}
