import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from "@ngxs/store";
import {AuthState} from "../../shared/states/auth/auth.state";

@Injectable({
  providedIn: 'root',
})
export class TransactionResolver implements Resolve<any> {
  constructor(private store: Store) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return of(this.store.selectSnapshot(AuthState.currentUserRole));
  }
}
