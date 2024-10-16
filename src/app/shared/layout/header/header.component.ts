import { Component, OnInit } from '@angular/core';
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }


  clearSearchInput() {
    this.searchService.clearSearchQuery();
  }
}
