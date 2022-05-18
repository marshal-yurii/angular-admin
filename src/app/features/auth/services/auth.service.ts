import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = {};

  constructor(
    private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<any> {
    return this.httpClient.get('/users');
  }
}
