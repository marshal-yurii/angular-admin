import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './settings.actions';

export interface SettingsStateModel {
  loading: boolean;
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

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<SettingsStateModel>): void {
  }

  @Action(Act.Login)
  login(ctx: StateContext<SettingsStateModel>, {loginData}: Act.Login): Observable<any> {
    ctx.patchState({loading: true});

    return of({});
  }
}
