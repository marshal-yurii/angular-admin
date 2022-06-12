export class Login {
  static readonly type = '[Dashboard] login user';

  constructor(public loginData: { email: string, password: string }) {
  }
}
