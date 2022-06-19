import {Action, NgxsOnInit, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import * as Act from './auth.actions';
import {UserRolesEnum} from "../../enums/user-roles.enum";
import {CookiesService} from "../../../core/sevices/cookies.service";
import {tap} from "rxjs/operators";

export interface AuthStateModel {
  loading: boolean;
  loginStatus: boolean;
  currentUser: any;
  currentState: number;
  currentUserRole: UserRolesEnum;
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

  @Selector()
  static loginStatus(state: AuthStateModel): boolean {
    return state.loginStatus;
  }

  @Selector()
  static currentUser(state: AuthStateModel): any {
    return state.currentUser;
  }

  @Selector()
  static currentState(state: AuthStateModel): number {
    return state.currentState;
  }

  @Selector()
  static currentUserRole(state: AuthStateModel): UserRolesEnum {
    return state.currentUserRole;
  }

  constructor(
    private cookiesService: CookiesService,
  ) {
  }

  ngxsOnInit(ctx: StateContext<AuthStateModel>): void {
    // just for demo purposes
    ctx.patchState({currentUserRole: UserRolesEnum.SuperAdmin});
  }

  @Action(Act.Login)
  login(ctx: StateContext<AuthStateModel>, {data}: Act.Login): Observable<any> {
    ctx.patchState({loading: true});

    if (data.password === 'superAdmin' || data.password === 'admin') {
      this.cookiesService.setCookie('AA_UT', 'token_hash', 1);
      return of(true).pipe(tap(() => ctx.patchState({loading: false, loginStatus: true})));
    }

    return of(false).pipe(tap(() => ctx.patchState({loading: false, loginStatus: false})));
  }

  @Action(Act.SetCurrentUserRole)
  setCurrentUserRole(ctx: StateContext<AuthStateModel>, {role}: Act.SetCurrentUserRole): void {
    ctx.patchState({currentUserRole: role});
  }

  @Action(Act.GetCurrentUser)
  getCurrentUser(ctx: StateContext<AuthStateModel>, {}: Act.GetCurrentUser): void {
    ctx.patchState({
      currentUser: {
        id: 0,
        name: 'LoggedIn User',
        role: UserRolesEnum.SuperAdmin,
      },
    });
  }

  @Action(Act.GetCurrentState)
  getCurrentState(ctx: StateContext<AuthStateModel>, {}: Act.GetCurrentState): void {
    ctx.patchState({currentState: 10});
  }

  // getUsers(): Observable<any> {
  //   return this.httpClient.get('/users');
  // }
  //
  // getRole(): UserRolesEnum {
  //   return this.currentUserRole;
  // }

  // getCurrentState(): Observable<number> {
  //   return of(10);
  // }
  //
  // hasToken(): boolean {
  //   return !!this.cookiesService.getCookie('AA_UT');
  // }
}
