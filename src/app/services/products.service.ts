import { Injectable } from '@angular/core';
import { products } from '../mocks/products';
import { Filter } from '../models.ts/filters';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  fetchProducts(selectedFilter: Filter) {
    console.log(selectedFilter);
    if (selectedFilter && Object.keys(selectedFilter).length > 0) {
      return this.fetchProductsByFilter(selectedFilter);
    } else return products.slice();
  }
  private fetchProductsByFilter(selectedFilter: Filter) {
    let final_products = [];
    products.forEach((product) => {
      let isValidProduct = true;
      if (
        (selectedFilter.brand &&
          product.brand.toLocaleLowerCase() !=
            selectedFilter.brand.toLocaleLowerCase()) ||
        (selectedFilter.category &&
          product.category.toLocaleLowerCase() !=
            selectedFilter.category.toLocaleLowerCase()) ||
        (selectedFilter.ideal_for &&
          product.ideal_for.toLocaleLowerCase() !=
            selectedFilter.ideal_for.toLocaleLowerCase()) ||
        (selectedFilter.size &&
          product.size.toLocaleLowerCase() !=
            selectedFilter.size.toLocaleLowerCase()) ||
        (selectedFilter.price && product.price > selectedFilter.price)
      ) {
        isValidProduct = false;
      }
      if (isValidProduct) final_products.push(product);
    });
    return final_products;
  }
  getMinProductPrice() {
    return products.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }).price;
  }
  getMaxProductPrice() {
    return products.reduce((prev, curr) => {
      return prev.price > curr.price ? prev : curr;
    }).price;
  }
}
