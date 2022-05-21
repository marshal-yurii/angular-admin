import { Component, OnInit } from '@angular/core';
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

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
      name: 'User Details',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
