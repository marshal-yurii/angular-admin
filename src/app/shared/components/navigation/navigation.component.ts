import {Component, OnInit} from '@angular/core';
import {INavigation} from "../../interfaces/navigation.interface";
import {UserRolesEnum} from "../../enums/user-roles.enum";
import {Observable} from "rxjs";
import {ThemesEnum} from "../../enums/themes.enum";
import {Select, Store} from "@ngxs/store";
import {SetCurrentTheme} from "../../states/settings/settings.actions";
import {SettingsState} from "../../states/settings/settings.state";
import {AuthState} from "../../states/auth/auth.state";

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

  currentTheme!: ThemesEnum;
  ThemesEnum = ThemesEnum;

  @Select(SettingsState.currentTheme) currentTheme$!: Observable<ThemesEnum>;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new SetCurrentTheme(ThemesEnum.Light));
  }

  checkSettingsVisibility(nav: INavigation): boolean {
    return nav.url !== 'settings' || (this.store.selectSnapshot(AuthState.currentUserRole) === UserRolesEnum.SuperAdmin);
  }
}
