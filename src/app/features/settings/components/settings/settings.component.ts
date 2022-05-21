import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {ThemesEnum} from "../../../../shared/enums/themes.enum";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  darkTheme!: boolean;

  selectedUsers: IUser[] = [];
  usersList: IUser[] = usersDataMock;

  userListSettings: any = {
    selectAllText: 'All Users',
    unSelectAllText: 'Deselect All',
    allowSearchFilter: true,
    searchPlaceholderText: 'Search Users',
    noDataAvailablePlaceholderText: 'No users available',
  };
  userItemsShowLimit = 2;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  setTheme(ev: boolean): void {
    this.settingsService.currentTheme$.next(ev ? ThemesEnum.Dark : ThemesEnum.Light);
  }

  changeSelectedUsers(period: any, add: boolean): void {
  }
}
