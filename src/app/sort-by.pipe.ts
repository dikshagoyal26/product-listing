import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './models.ts/product.model';

@Pipe({
  name: 'sortBy',
})
export class SortByPipe implements PipeTransform {
  transform(products: any[], order: string, key: string): any[] {
    console.log({ products, key, order });
    if (order == 'asc') {
      products.sort(function (a, b) {
        return +a[key] - +b[key];
      });
      console.log(products);
    } else if (order == 'des') {
      products.sort(function (a, b) {
        return +b[key] - +a[key];
      });
    }
    return products;
  }
}
