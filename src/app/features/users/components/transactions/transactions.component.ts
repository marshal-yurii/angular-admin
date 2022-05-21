import {Component, OnInit} from '@angular/core';
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [
    {
      path: '/',
      name: 'Dashboard',
    },
    {
      path: './../users',
      name: 'Users',
    },
    {
      path: '',
      name: 'Transactions',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
