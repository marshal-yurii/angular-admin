import {NgModule} from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {PageNotFoundComponent} from "./features/page-not-found/page-not-found.component";
import {SuperAdminGuard} from "./core/guards/super-admin.guard";
import {AuthGuard} from "./core/guards/auth.guard";
import {BaseComponent} from "./features/base/base.component";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        data: { animation: 'rightToLeft' },
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'settings',
        canActivate: [SuperAdminGuard],
        loadChildren: () => import('./features/settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {path: '**', redirectTo: '404'},
];

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'top',
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, routerOptions),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
