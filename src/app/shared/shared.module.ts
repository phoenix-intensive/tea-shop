import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {TruncateTextPipe} from "./pipes/truncate-text.pipe";





@NgModule({
  declarations: [
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    TruncateTextPipe
  ]
})
export class SharedModule { }
