export class Login {
  static readonly type = '[Auth] login user';

  constructor(public loginData: { email: string, password: string }) {
  }
}
