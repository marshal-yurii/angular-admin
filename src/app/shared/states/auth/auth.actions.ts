import {UserRolesEnum} from "../../enums/user-roles.enum";

export class Login {
  static readonly type = '[Auth] login user';

  constructor(public data: { email: string, password: string }) {
  }
}

export class GetCurrentUser {
  static readonly type = '[Auth] set logged in user';
}

export class GetCurrentState {
  static readonly type = '[Auth] set logged in user state id';
}

export class SetCurrentUserRole {
  static readonly type = '[Auth] set logged in user role';

  constructor(public role: UserRolesEnum) {
  }
}
