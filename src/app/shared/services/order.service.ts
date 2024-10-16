import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {

  }

  createOrder(data: {
    name: string,
    last_name: string,
    phone: string,
    country: string,
    zip: number,
    product: string,
    address: string,
    comment?: string,
  }) {
    return this.http.post<{ success: string, message?: string }>(environment.apiURL + `order-tea`, data);
  }
}
