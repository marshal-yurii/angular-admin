import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbsModule} from "./shared/components/breadcrumbs/breadcrumbs.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {NgChartsModule} from 'ng2-charts';
import {MaterialModule} from "./material/material.module";
import {AuthModule} from "./features/auth/auth.module";
import { TimeAgoPipe } from './shared/pipes/time-ago.pipe';
import {HttpClientModule} from "@angular/common/http";
import { AccordionDirective } from './shared/directives/accordion.directive';
import {InputControlAccessorDirective} from "./shared/directives/input-control-accessor.directive";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TimeAgoPipe,
    AccordionDirective,
    InputControlAccessorDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BreadcrumbsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
    AuthModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
