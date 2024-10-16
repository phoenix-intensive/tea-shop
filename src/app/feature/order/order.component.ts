import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {OrderService} from "../../shared/services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../shared/services/search.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router, private activatedRoute: ActivatedRoute,
              private searchService: SearchService) {
  }

  private subscriptionOrder: Subscription | null = null;

  orderCompleted: boolean = false;
  orderError: boolean = false;

  formValues = {
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    zip: '',
    product: '',
    address: '',
    comment: ''
  }

  checkoutForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё]+$/)]],
    phone: ['', [Validators.required, Validators.pattern(/^(?:\+?)?\d{11}$/)]],
    address: ['', [Validators.required, Validators.pattern(/^[A-Za-zА-Яа-яЁё0-9\s\-\/]+$/)]],
    country: ['', Validators.required],
    zip: ['', Validators.required],
    product: ['', Validators.required],
    comment: ['']
  })

  ngOnInit(): void {
    //Передача элементов через url-параметры
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['product']) {
        this.formValues.product = params['product'];
      }
    })
  }


  createOrder() {
    this.subscriptionOrder = this.orderService.createOrder({
      name: this.checkoutForm.value.firstName ?? '',
      last_name: this.checkoutForm.value.lastName ?? '',
      phone: this.checkoutForm.value.phone ?? '',
      country: this.checkoutForm.value.country ?? '',
      zip: parseInt(this.checkoutForm.value.zip ?? '0', 10),
      product: this.checkoutForm.value.product ?? '',
      address: this.checkoutForm.value.address ?? '',
      comment: this.checkoutForm.value.comment ?? ''
    })
      .subscribe({
        next: (response) => {
          if (response.success && !response.message) {
            this.orderCompleted = true;
            this.orderError = false;
            this.searchService.clearSearchQuery();
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 3000);
          } else {
            this.orderError = true;
            this.orderCompleted = false;
          }
        },
        error: (error) => {
          console.error('Ошибка при отправке формы:', error);
          this.orderError = true;
          this.orderCompleted = false;
        }
      });
  }

  ngOnDestroy() {
    this.subscriptionOrder?.unsubscribe();
  }
}

