import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";
import {Store} from "@ngxs/store";
import {AuthState} from "../../shared/states/auth/auth.state";

@Injectable({
  providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.store.selectSnapshot(AuthState.currentUserRole) === UserRolesEnum.SuperAdmin) {
      return true;
    } else {
      this.router.navigateByUrl('404');
      return false;
    }
  }

}
