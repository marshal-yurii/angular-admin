import {Component, OnInit} from '@angular/core';
import {IBreadcrumb} from "../../../../shared/interfaces/breadcrumb.interface";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  breadcrumbs: IBreadcrumb[] = [
    {
      path: '/',
      name: 'Dashboard',
    },
    {
      path: '/users',
      name: 'Users',
    },
    {
      path: '',
      name: 'Edit User',
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
