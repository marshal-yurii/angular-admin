import {ThemesEnum} from "../../enums/themes.enum";

export class SetCurrentTheme {
  static readonly type = '[Settings] set theme for a system';

  constructor(public theme: ThemesEnum) {
  }
}
