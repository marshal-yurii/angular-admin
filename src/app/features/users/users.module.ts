import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './components/users/users.component';
import {MaterialModule} from "../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TogglerModule} from "../../shared/components/toggler/toggler.module";
import {UsersTableModule} from "../../shared/components/users-table/users-table.module";
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionDetailsComponent } from './components/transaction-details/transaction-details.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import {BreadcrumbsModule} from "../../shared/components/breadcrumbs/breadcrumbs.module";
import {TransactionsTableModule} from "../../shared/components/transactions-table/transactions-table.module";
import {TransactionResolver} from "../../core/resolvers/transaction.resolver";

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  {
    path: ':id',
    resolve: {role: TransactionResolver},
    component: UserDetailsComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'transactions/:id',
    component: TransactionDetailsComponent,
  },
  {
    path: 'user',
    component: EditUserComponent,
  },
  {
    path: 'user/:id',
    component: EditUserComponent,
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    UserDetailsComponent,
    TransactionsComponent,
    TransactionDetailsComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    TogglerModule,
    UsersTableModule,
    BreadcrumbsModule,
    TransactionsTableModule,
  ]
})
export class UsersModule {
}
