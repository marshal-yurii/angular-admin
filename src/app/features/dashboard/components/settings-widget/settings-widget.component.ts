import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/sevices/auth.service";
import {UserRolesEnum} from "../../../../shared/enums/user-roles.enum";

@Component({
  selector: 'app-settings-widget',
  templateUrl: './settings-widget.component.html',
  styleUrls: ['./settings-widget.component.scss'],
})
export class SettingsWidgetComponent implements OnInit {
  allowTransactions = true;
  isSuperAdmin = true;

  constructor(
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
  }

  setUserRole(ev: boolean): void {
    this.authService.currentUserRole = ev ? UserRolesEnum.SuperAdmin : UserRolesEnum.Admin;
  }
}
