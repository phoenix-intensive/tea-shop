import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./feature/layout.component";


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', loadChildren: () => import('./feature/main/main.module').then(m => m.MainModule)},
      {path: 'order', loadChildren: () => import('./feature/order/order.module').then(m => m.OrderModule)},
      {path: 'products', loadChildren: () => import('./feature/products/products.module').then(m => m.ProductsModule)},
      {path: 'search', loadChildren: () => import('./feature/search/search.module').then(m => m.SearchModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
