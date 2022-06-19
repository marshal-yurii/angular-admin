import {Component} from '@angular/core';
import {Select} from "@ngxs/store";
import {SettingsState} from "../../states/settings/settings.state";
import {Observable} from "rxjs";
import {ThemesEnum} from "../../enums/themes.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Select(SettingsState.currentTheme) currentTheme$!: Observable<ThemesEnum>;

  constructor(
  ) {
  }

}
