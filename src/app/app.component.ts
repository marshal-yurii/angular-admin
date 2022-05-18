import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnChanges, OnInit {

  headerInner: string;
  title = 'angular-admin';

  breadcrumbs: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.headerInner = 'MY APP';
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.breadcrumbs = [
      'dashboard',
      'users',
      'user',
    ];
  }

  redirectTo(breadcrumb: string): void {
    this.router.navigateByUrl(breadcrumb);
  }
}
