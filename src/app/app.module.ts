import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BreadcrumbsModule} from "./shared/components/breadcrumbs/breadcrumbs.module";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DashboardComponent} from "./features/dashboard/dashboard.component";
import {NgChartsModule} from 'ng2-charts';
import {MaterialModule} from "./material/material.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BreadcrumbsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
