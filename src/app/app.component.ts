import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AuthService} from "./core/sevices/auth.service";
import {UserRolesEnum} from "./shared/enums/user-roles.enum";
import {slideToLeft} from "./shared/animations/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideToLeft],
})
export class AppComponent implements OnInit {

  headerInner: string;
  title = 'angular-admin';

  breadcrumbs: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.headerInner = 'MY APP';
  }

  ngOnInit(): void {
    this.authService.currentUserRole = UserRolesEnum.SuperAdmin;
    this.breadcrumbs = [
      'dashboard',
      'users',
      'user',
    ];
  }

  redirectTo(breadcrumb: string): void {
    this.router.navigateByUrl(breadcrumb);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
