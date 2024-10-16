import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {SearchComponent} from "./search/search.component";
import {LayoutComponent} from "../layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, // Убедитесь, что LayoutComponent используется как родительский компонент
    children: [
      { path: '', component: SearchComponent },
      { path: ':id', component: CatalogComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
