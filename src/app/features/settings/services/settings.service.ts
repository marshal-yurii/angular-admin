import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {ThemesEnum} from "../../../shared/enums/themes.enum";

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  currentTheme$: BehaviorSubject<ThemesEnum> = new BehaviorSubject<ThemesEnum>(ThemesEnum.Light);

  constructor() {
  }
}
