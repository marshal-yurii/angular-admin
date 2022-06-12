import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";
import {CookiesService} from "./cookies.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = {};
  currentUserRole: UserRolesEnum = UserRolesEnum.SuperAdmin;

  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookiesService,
  ) {
  }

  getUsers(): Observable<any> {
    return this.httpClient.get('/users');
  }

  getRole(): UserRolesEnum {
    return this.currentUserRole;
  }

  getCurrentUser(): Observable<any> {
    return of({
      id: 0,
      name: 'LoggedIn User',
      role: UserRolesEnum.SuperAdmin,
    })
  }

  getCurrentState(): Observable<number> {
    return of(10);
  }

  hasToken(): boolean {
    return !!this.cookiesService.getCookie('AA_UT');
  }

  login(data: any): Observable<boolean> {
    if (data.password === 'superAdmin' || data.password === 'admin') {
      this.cookiesService.setCookie('AA_UT', 'token_hash', 1);
      return of(true);
    }

    return of(false);
  }
}
