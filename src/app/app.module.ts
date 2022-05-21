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
import {TimeAgoPipe} from './shared/pipes/time-ago.pipe';
import {HttpClientModule} from "@angular/common/http";
import {AccordionDirective} from './shared/directives/accordion.directive';
import {InputControlAccessorDirective} from "./shared/directives/input-control-accessor.directive";
import {HeaderModule} from "./shared/components/header/header.module";
import {NavigationModule} from "./shared/components/navigation/navigation.module";
import {FooterModule} from "./shared/components/footer/footer.module";
import {VisitorsChartComponent} from './features/dashboard/components/visitors-chart/visitors-chart.component';
import {UsersTableModule} from "./shared/components/users-table/users-table.module";
import {SettingsWidgetComponent} from './features/dashboard/components/settings-widget/settings-widget.component';
import {TogglerModule} from "./shared/components/toggler/toggler.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TimeAgoPipe,
    AccordionDirective,
    InputControlAccessorDirective,
    VisitorsChartComponent,
    SettingsWidgetComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BreadcrumbsModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
    AuthModule,
    HttpClientModule,
    HeaderModule,
    NavigationModule,
    FooterModule,
    UsersTableModule,
    TogglerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
