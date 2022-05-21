import {Component, OnInit} from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {ThemesEnum} from "../../../../shared/enums/themes.enum";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  darkTheme!: boolean;

  constructor(
    private settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

  setTheme(ev: boolean): void {
    this.settingsService.currentTheme$.next(ev ? ThemesEnum.Dark : ThemesEnum.Light);
  }
}
