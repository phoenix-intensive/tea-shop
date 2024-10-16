import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchQuery: string = '';

  private searchSubject = new Subject<string>();
  search$ = this.searchSubject.asObservable();



  setSearchQuery(query: string): void {
    this.searchSubject.next(query);
  }


  clearSearchQuery(): void {
    this.searchSubject.next('');
    this.searchQuery = '';
  }


  constructor() { }
}
