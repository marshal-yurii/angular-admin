import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserRolesEnum} from "../../../../shared/enums/user-roles.enum";
import {Store} from "@ngxs/store";
import {SetCurrentUserRole} from "../../../../shared/states/auth/auth.actions";

@Component({
  selector: 'app-settings-widget',
  templateUrl: './settings-widget.component.html',
  styleUrls: ['./settings-widget.component.scss'],
})
export class SettingsWidgetComponent implements OnInit {
  @Output() transactionsSettingsChange: EventEmitter<boolean> = new EventEmitter();

  allowTransactions = true;
  isSuperAdmin = true;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
  }

  setUserRole(ev: boolean): void {
    this.store.dispatch(new SetCurrentUserRole(ev ? UserRolesEnum.SuperAdmin : UserRolesEnum.Admin));
  }
}
