import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './components/users/users.component';
import {MaterialModule} from "../../material/material.module";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ]
})
export class UsersModule {
}
