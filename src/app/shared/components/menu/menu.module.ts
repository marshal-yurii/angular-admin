import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent, MenuDirective} from './menu.component';

@NgModule({
  entryComponents: [
    MenuComponent,
  ],
  declarations: [
    MenuDirective,
    MenuComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuDirective,
    MenuComponent,
  ],
})
export class MenuModule {
}
