import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {SearchProductsService} from "../../../shared/services/search-products.service";
import {Subscription, tap} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})


export class CatalogComponent implements OnInit, OnDestroy {
  products: ProductType[] = [];
  searchQuery: string = '';
  title: string = '';

  private subscription: Subscription | null = null;
  private subscriptionGetSearchProducts: Subscription | null = null;
  loading: boolean = false;

  @Input() product: ProductType = {} as ProductType;

  constructor(private searchProductsService: SearchProductsService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Подписка на изменения параметров маршрута
    this.subscription = this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'];
      this.searchGetProducts(this.searchQuery);
    });
  }

  searchGetProducts(query?: string): void {
    if (!query) {
      this.products = [];
      this.title = `Вы ввели пустой запрос(((`;
      return;
    }
    this.loading = true;
    this.subscriptionGetSearchProducts = this.searchProductsService.getSearchProducts(query)
      .pipe(
        //Оператор tap примениться, когда мы получим какой-либо ответ
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (data) => {
          if (data && data.length > 0) {
            this.products = data;
            this.title = `Результаты поиска по запросу: "${query}"`;
          } else {
            this.products = [];
            this.title = `По вашему запросу "${query}" ничего не найдено(((`;
          }
        },
        error: (error) => {
          console.error('Ошибка при загрузке товаров:', error);
        }
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionGetSearchProducts?.unsubscribe();
  }
}
