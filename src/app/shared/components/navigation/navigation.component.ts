import {Component, OnInit} from '@angular/core';
import {INavigation} from "../../interfaces/navigation.interface";
import {AuthService} from "../../../core/sevices/auth.service";
import {UserRolesEnum} from "../../enums/user-roles.enum";

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

  UserRolesEnum = UserRolesEnum;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  checkSettingsVisibility(nav: INavigation): boolean {
    return nav.url !== 'settings' || (this.authService.getRole() === UserRolesEnum.SuperAdmin);
  }
}
