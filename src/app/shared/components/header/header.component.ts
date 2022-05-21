import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../../features/settings/services/settings.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit(): void {
  }

}
