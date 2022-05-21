import { Component, OnInit } from '@angular/core';
import {INavigation} from "../../interfaces/navigation.interface";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {

  navItems: INavigation[] = [
    {
      url: '',
      name: 'Dashboard',
    },
    {
      url: 'users',
      name: 'Users',
    },
    {
      url: 'settings',
      name: 'Settings',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
