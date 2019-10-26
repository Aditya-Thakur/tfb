import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marketPrice'
})
export class MarketPricePipe implements PipeTransform {

  transform(mp: number, sp: number): string {
    if (mp === sp) {
      return '';
    } else { return 'Rs. ' + mp; }
  }

}
