import {IUser} from "../../interfaces/user.interface";

export class GetUsers {
  static readonly type = '[Users] get all user';

  constructor(public searchParams: any) {
  }
}

export class UpdateCurrentUser {
  static readonly type = '[Users] update current user';

  constructor(public user: IUser) {
  }
}
