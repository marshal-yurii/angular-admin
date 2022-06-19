import {Injectable} from '@angular/core';
import {CookiesService} from "./cookies.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private cookiesService: CookiesService,
  ) {
  }

  hasToken(): boolean {
    return !!this.cookiesService.getCookie('AA_UT');
  }
}
