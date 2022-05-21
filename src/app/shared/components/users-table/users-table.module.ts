import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersTableComponent} from './users-table.component';
import {MaterialModule} from "../../../material/material.module";

@NgModule({
  declarations: [
    UsersTableComponent,
  ],
  exports: [
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ]
})
export class UsersTableModule {
}
