import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchService} from "../../../shared/services/search.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy{

  public searchQuery: string = '';
  private subscriptionSearch: Subscription | null = null;

  constructor(private searchService: SearchService, private router: Router) {
  }

  ngOnInit(): void {
    // Подписка на изменения в поисковом запросе
    this.subscriptionSearch = this.searchService.search$.subscribe(query => {
      this.searchQuery = query;
    });
  }

  onSearch(): void {
    this.searchService.setSearchQuery(this.searchQuery);
    this.router.navigate(['/catalog'], {queryParams: {search: this.searchQuery}});
  }

  onClear(): void {
    this.searchService.clearSearchQuery();
    this.router.navigate(['/products']); // Переход на страницу каталога после сброса
  }

  ngOnDestroy() {
    this.subscriptionSearch?.unsubscribe();
  }

}
