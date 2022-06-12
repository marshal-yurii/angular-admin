export class Login {
  static readonly type = '[Settings] login user';

  constructor(public loginData: { email: string, password: string }) {
  }
}
