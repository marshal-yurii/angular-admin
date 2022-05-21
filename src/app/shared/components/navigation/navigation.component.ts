import {Component, OnDestroy, OnInit} from '@angular/core';
import {INavigation} from "../../interfaces/navigation.interface";
import {AuthService} from "../../../core/sevices/auth.service";
import {UserRolesEnum} from "../../enums/user-roles.enum";
import {SettingsService} from "../../../features/settings/services/settings.service";
import {Subject, takeUntil} from "rxjs";
import {ThemesEnum} from "../../enums/themes.enum";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
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
  UserRolesEnum = UserRolesEnum;

  private readonly onDestroy$: Subject<void> = new Subject();

  constructor(
    private authService: AuthService,
    private settingService: SettingsService,
  ) { }

  ngOnInit(): void {
    this.settingService.currentTheme$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((theme: ThemesEnum) => {
        this.currentTheme = theme;
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  checkSettingsVisibility(nav: INavigation): boolean {
    return nav.url !== 'settings' || (this.authService.getRole() === UserRolesEnum.SuperAdmin);
  }
}
