import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter } from 'src/app/models.ts/filters';
import { ProductsService } from 'src/app/services/products.service';
import { brands } from '../../mocks/brands';
import { categories } from '../../mocks/categories';
import { ideal_for } from '../../mocks/ideal_for';
import { size } from '../../mocks/size';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() selectedFilter: Filter;
  public brands = brands;
  public categories = categories;
  public ideal_for = ideal_for;
  public size = size;
  public minPrice;
  public maxPrice;
  public selectedPrice;
  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setFilters();
  }
  ngOnChanges() {
    this.setFilters();
  }
  setFilters() {
    this.getMinPrice();
    this.getMaxPrice();
    this.selectedPrice = this.selectedFilter.price || this.maxPrice;
  }
  canDisplayClear(key) {
    if (!key && Object.keys(this.selectedFilter).length > 0) return true;
    if (key == 'price') return this.selectedPrice != this.maxPrice;
    if (this.selectedFilter[key]) {
      return true;
    }
    return false;
  }
  private getMinPrice() {
    this.minPrice = this.productsService.getMinProductPrice();
  }
  private getMaxPrice() {
    this.maxPrice = this.productsService.getMaxProductPrice();
  }
  isActive(key, val) {
    return (
      this.selectedFilter &&
      this.selectedFilter[key] &&
      this.selectedFilter[key] == val
    );
  }
  setFilter(filter: Filter) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: filter,
      queryParamsHandling: 'merge',
    });
  }
  clearFilter(key) {
    if (!key) {
      this.router.navigate(['']);
    } else {
      let filters = { ...this.selectedFilter };
      filters[key] = null;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: filters,
        queryParamsHandling: 'merge',
      });
    }
  }
  onPriceChange(price) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { price },
      queryParamsHandling: 'merge',
    });
  }
}
