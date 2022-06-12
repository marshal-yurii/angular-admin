import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './users.actions';

export interface UsersStateModel {
  loading: boolean;
}

@State<UsersStateModel>({
  name: 'users',
})

@Injectable()
export class UsersState implements NgxsOnInit {
  @Selector()
  static loading(state: UsersStateModel): boolean {
    return state.loading;
  }

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<UsersStateModel>): void {
  }

  @Action(Act.Login)
  login(ctx: StateContext<UsersStateModel>, {loginData}: Act.Login): Observable<any> {
    ctx.patchState({loading: true});

    return of({});
  }
}
