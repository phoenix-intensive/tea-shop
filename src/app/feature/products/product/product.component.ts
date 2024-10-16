import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ProductType} from "../../../../types/product.type";
import {Subscription, tap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../shared/services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  @Input() product: ProductType = {} as ProductType;

  private subscriptionRoute: Subscription | null = null;
  private subscriptionGetProduct: Subscription | null = null;
  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.loading = true;
    //Передача элементов через url-параметры
    this.subscriptionRoute = this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.subscriptionGetProduct = this.productService.getProduct(+params['id'])
          .pipe(
            //Оператор tap примениться, когда мы получим какой-либо ответ
            tap(() => {
              this.loading = false;
            })
          )
          .subscribe(
            {
              next: (data: ProductType) => {
                this.product = data;
              },
              error: (error) => {
                console.log(error);
                this.router.navigate(['/']);
              }
            }
          )
      }
    })
  }

  ngOnDestroy() {
    this.subscriptionRoute?.unsubscribe();
    this.subscriptionGetProduct?.unsubscribe();
  }
}
