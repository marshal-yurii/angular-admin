import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class AuthModule {
}
