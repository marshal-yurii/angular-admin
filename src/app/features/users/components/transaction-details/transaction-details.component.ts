import {Component, OnInit} from '@angular/core';
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent implements OnInit {

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
      path: './../users/transactions',
      name: 'Transactions',
    },
    {
      path: '',
      name: 'Transaction Details',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
