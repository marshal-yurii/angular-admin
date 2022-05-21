import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = {};
  currentUserRole: UserRolesEnum = UserRolesEnum.Admin;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getUsers(): Observable<any> {
    return this.httpClient.get('/users');
  }

  getRole(): UserRolesEnum {
    return this.currentUserRole;
  }
}
