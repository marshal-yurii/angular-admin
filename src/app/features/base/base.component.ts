import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AuthService} from "../../core/sevices/auth.service";
import {UserRolesEnum} from "../../shared/enums/user-roles.enum";
import {slideToLeft} from "../../shared/animations/animations";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  animations: [slideToLeft],
})
export class BaseComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authService.currentUserRole = UserRolesEnum.SuperAdmin;
  }

  redirectTo(breadcrumb: string): void {
    this.router.navigateByUrl(breadcrumb);
  }

  getRouterAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
