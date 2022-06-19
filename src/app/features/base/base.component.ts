import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";
import {slideToLeft} from "../../shared/animations/animations";
import {Store} from "@ngxs/store";
import {SetCurrentUserRole} from "../../shared/states/auth/auth.actions";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideToLeft],
})
export class BaseComponent implements OnInit {

  constructor(
    private router: Router,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(new SetCurrentUserRole(UserRolesEnum.SuperAdmin));
  }

  redirectTo(breadcrumb: string): void {
    this.router.navigateByUrl(breadcrumb);
  }

  getRouterAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
