import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchInputComponent} from './search-input.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ClickOutsideModule} from "../../directives/click-outside/click-outside.module";

@NgModule({
  declarations: [
    SearchInputComponent,
  ],
  exports: [
    SearchInputComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideModule,
  ]
})
export class SearchInputModule {
}
