import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of, tap} from "rxjs";
import * as Act from './users.actions';
import {IUser} from "../../interfaces/user.interface";
import {usersDataMock} from "../../../../testing/mocks/usersDataMock";
import {Cacheable} from "ts-cacheable";

export interface UsersStateModel {
  loading: boolean;
  users: IUser[];
  currentUser: IUser;
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

  @Selector()
  static users(state: UsersStateModel): IUser[] {
    return state.users;
  }

  @Selector()
  static currentUser(state: UsersStateModel): IUser {
    return state.currentUser;
  }

  constructor() {
  }

  ngxsOnInit(ctx: StateContext<UsersStateModel>): void {
  }

  // this decorator will cache the data you want to reuse further without calling the source
  // or create your one e.g. this version: https://gist.github.com/daxartio/5ebce9eac73d578615f3a8a8cf72a594
  @Cacheable()
  @Action(Act.GetUsers)
  getUsers(ctx: StateContext<UsersStateModel>, {searchParams}: Act.GetUsers): Observable<IUser[]> {
    ctx.patchState({loading: true});

    return of(usersDataMock).pipe(tap(() => {
      ctx.patchState({loading: false, users: usersDataMock});
    }));
  }

  @Action(Act.UpdateCurrentUser)
  updateCurrentUser(ctx: StateContext<UsersStateModel>, {user}: Act.UpdateCurrentUser): void {
    ctx.patchState({currentUser: user});
  }
}
