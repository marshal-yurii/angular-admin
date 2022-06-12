import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {IUser} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);

  constructor(
    private http: HttpClient,
  ) { }

  updateCurrentUser(user: IUser): Observable<number> {
    return of(1);
    // return this.http.patch('/UpdateUser', user);
  }
}
