import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './settings.actions';
import {ThemesEnum} from "../../enums/themes.enum";

export interface SettingsStateModel {
  loading: boolean;
  currentTheme: ThemesEnum;
}

@State<SettingsStateModel>({
  name: 'settings',
})

@Injectable()
export class SettingsState implements NgxsOnInit {
  @Selector()
  static loading(state: SettingsStateModel): boolean {
    return state.loading;
  }

  @Selector()
  static currentTheme(state: SettingsStateModel): ThemesEnum {
    return state.currentTheme;
  }

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<SettingsStateModel>): void {
  }

  @Action(Act.SetCurrentTheme)
  setCurrentTheme(ctx: StateContext<SettingsStateModel>, {theme}: Act.SetCurrentTheme): void {
    ctx.patchState({currentTheme: theme});
  }
}
