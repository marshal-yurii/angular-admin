import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthService} from "../sevices/auth.service";

@Injectable({
  providedIn: 'root',
})
export class TransactionResolver implements Resolve<any> {
  constructor(private authService: AuthService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return of(this.authService.getRole());
  }
}
