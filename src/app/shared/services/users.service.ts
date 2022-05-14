import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IUser} from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({} as IUser);

  constructor() { }
}
