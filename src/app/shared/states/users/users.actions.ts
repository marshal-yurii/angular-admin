export class Login {
  static readonly type = '[Users] login user';

  constructor(public loginData: { email: string, password: string }) {
  }
}
