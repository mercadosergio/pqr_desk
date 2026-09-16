import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance, formatDistanceToNowStrict } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timeDistance',
})
export class TimeDistancePipe implements PipeTransform {
  transform(value: Date | string | number, endDate?: Date | string | number): string {
    if (!value) return '';

    const startDate = new Date(value);

    if (endDate) {
      return formatDistance(startDate, new Date(endDate), { locale: es });
    } else {
      return formatDistanceToNowStrict(startDate, { addSuffix: true, locale: es });
    }
  }
}
