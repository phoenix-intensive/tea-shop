import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SearchProductsService {
  private apiUrl: string = 'https://testologia.ru/tea';

  constructor(private http: HttpClient) { }

  getSearchProducts(query?: string): Observable<ProductType[]> {
    const url: string = query ? `${this.apiUrl}?search=${encodeURIComponent(query)}` : this.apiUrl;
    return this.http.get<ProductType[]>(url);
  }
}
