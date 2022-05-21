import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-widget',
  templateUrl: './settings-widget.component.html',
  styleUrls: ['./settings-widget.component.scss'],
})
export class SettingsWidgetComponent implements OnInit {

  allowTransactions = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
