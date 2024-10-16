import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {Subscription, tap} from "rxjs";
import {ProductsService} from "../../../shared/services/products.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: ProductType[] = [];
  loading: boolean = false;

  private subscription: Subscription | null = null;

  @Input() product: ProductType = {} as ProductType;

  constructor(private productService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.productService.getProducts()
      .pipe(
        //Оператор tap примениться, когда мы получим какой-либо ответ
        tap(() => {
          this.loading = false;
        })
      )
      .subscribe(
        {
          next: (data: ProductType[]) => {
            this.products = data;
          },
          error: (error) => {
            console.log(error);
            this.router.navigate(['/']);
          }
        }
      )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
