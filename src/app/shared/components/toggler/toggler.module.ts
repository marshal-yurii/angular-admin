import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TogglerComponent} from './toggler.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TogglerComponent,
  ],
  exports: [
    TogglerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
  ]
})
export class TogglerModule {
}
