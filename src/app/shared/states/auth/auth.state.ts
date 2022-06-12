import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './auth.actions';

export interface AuthStateModel {
  loading: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
})

@Injectable()
export class AuthState implements NgxsOnInit {
  @Selector()
  static loading(state: AuthStateModel): boolean {
    return state.loading;
  }

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
  }

  @Action(Act.Login)
  login(ctx: StateContext<AuthStateModel>, {loginData}: Act.Login): Observable<any> {
    ctx.patchState({loading: true});

    return of({});
  }
}
