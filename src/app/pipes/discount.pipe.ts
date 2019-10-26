import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(mp: number, sp: number): string {
    let discount = ((mp - sp) / mp) * 100;
    discount = Math.trunc( discount );
    const toReturn = 'You save ' + discount + '%';
    if (discount * 1 === 0 ) {
      return '';
    } else {
      return toReturn;
    }
  }

}
