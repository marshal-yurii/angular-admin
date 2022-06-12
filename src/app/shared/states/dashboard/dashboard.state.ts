import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './dashboard.actions';

export interface DashboardStateModel {
  loading: boolean;
}

@State<DashboardStateModel>({
  name: 'dashboard',
})

@Injectable()
export class DashboardState implements NgxsOnInit {
  @Selector()
  static loading(state: DashboardStateModel): boolean {
    return state.loading;
  }

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<DashboardStateModel>): void {
  }

  @Action(Act.Login)
  login(ctx: StateContext<DashboardStateModel>, {loginData}: Act.Login): Observable<any> {
    ctx.patchState({loading: true});

    return of({});
  }
}
