import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Filter } from 'src/app/models.ts/filters';
import { Product } from 'src/app/models.ts/product.model';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnChanges {
  @Input() selectedFilter: Filter;
  public products: Product[] = [];
  public order: string = '';
  public key: string = 'price';
  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  ngOnChanges() {
    this.fetchProducts();
  }
  fetchProducts() {
    this.products = this.productsService.fetchProducts(this.selectedFilter);
  }
  setOrder(order) {
    this.order = order;
  }
}
