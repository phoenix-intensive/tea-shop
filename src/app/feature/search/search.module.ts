import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {CatalogComponent} from "./catalog/catalog.component";
import {SearchComponent} from "./search/search.component";
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CatalogComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    SearchRoutingModule
  ],
  exports: [
    SearchRoutingModule,
    SearchComponent
  ]
})
export class SearchModule { }
