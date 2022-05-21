import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersTableComponent} from './users-table.component';
import {MaterialModule} from "../../../material/material.module";
import {NgxMaskModule} from "ngx-mask";
import {FormsModule} from "@angular/forms";
import {ClickOutsideDirective} from "../../directives/click-outside.directive";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    UsersTableComponent,
    ClickOutsideDirective,
  ],
  exports: [
    UsersTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ]
})
export class UsersTableModule {
}
