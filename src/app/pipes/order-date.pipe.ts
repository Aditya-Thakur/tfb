import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'orderDate'
})
export class OrderDatePipe extends DatePipe implements PipeTransform {

  transform(value: any, pattern: string = 'MMM d, y, h:mm a'): string | null {
    const result = super.transform(value, pattern);
    return result;
  }

}
