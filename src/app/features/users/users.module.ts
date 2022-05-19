import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './components/users/users.component';
import {MaterialModule} from "../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TogglerModule} from "../../shared/components/toggler/toggler.module";

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
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TogglerModule,
  ]
})
export class UsersModule {
}
