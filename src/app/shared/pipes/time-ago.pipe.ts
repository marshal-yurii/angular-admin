import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  currentTime = '';

  transform(value: Date, format: string): string {
    if (!value || !(value instanceof Date)) {
      return '';
    }

    if (!format) {
      return value.getDate() + ' ' + value.getFullYear();
    }

    let dateString = '';

    switch (format) {
      case 'min':
        dateString = this.getMinutes(value);
        break;
      default:
        dateString = `${value.getMinutes()}mins`;
        break;
    }

    return dateString + ' ago';
  }

  getMinutes(date: Date): string {
    return `${date.getMinutes()}mins`;
  }
}
