import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MultiselectDropdownComponent} from './multiselect-dropdown.component';
import {MultiselectFilterPipe} from './multiselect-filter.pipe';
import {FormsModule} from '@angular/forms';
import {SearchInputModule} from '../search-input/search-input.module';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {ClickOutsideModule} from "../../directives/click-outside/click-outside.module";

@NgModule({
  declarations: [
    MultiselectDropdownComponent,
    MultiselectFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SearchInputModule,
    ScrollingModule,
    ClickOutsideModule,
  ],
  exports: [
    MultiselectDropdownComponent,
  ],
  providers: [MultiselectFilterPipe],
})
export class MultiselectDropdownModule {
}
