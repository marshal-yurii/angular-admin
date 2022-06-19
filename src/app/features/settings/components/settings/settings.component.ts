import {Component, OnInit} from '@angular/core';
import {ThemesEnum} from "../../../../shared/enums/themes.enum";
import {IUser} from "../../../../shared/interfaces/user.interface";
import {usersDataMock} from "../../../../../testing/mocks/usersDataMock";
import {Select, Store} from "@ngxs/store";
import {SetCurrentTheme} from "../../../../shared/states/settings/settings.actions";
import {SettingsState} from "../../../../shared/states/settings/settings.state";
import {Observable, take} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
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

  @Select(SettingsState.currentTheme) currentTheme$!: Observable<ThemesEnum>;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.currentTheme$.pipe(take(1))
      .subscribe((theme: ThemesEnum) => {
        this.darkTheme = theme && theme === ThemesEnum.Dark;
      });
  }

  setTheme(ev: boolean): void {
    if (ev !== undefined) {
      this.store.dispatch(new SetCurrentTheme(ev ? ThemesEnum.Dark : ThemesEnum.Light));
    }
  }

  changeSelectedUsers(period: any, add: boolean): void {
  }
}
