import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransactionsTableComponent} from './transactions-table.component';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    TransactionsTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [
    TransactionsTableComponent,
  ]
})
export class TransactionsTableModule {
}
