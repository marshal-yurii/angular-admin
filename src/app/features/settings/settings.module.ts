import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsComponent} from './components/settings/settings.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {TogglerModule} from "../../shared/components/toggler/toggler.module";
import {MultiselectDropdownModule} from "../../shared/components/multiselect-dropdown/multiselect-dropdown.module";
import {MenuModule} from "../../shared/components/menu/menu.module";
import {MaterialModule} from "../../material/material.module";

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    TogglerModule,
    MultiselectDropdownModule,
    MenuModule,
    MaterialModule,
  ]
})
export class SettingsModule {
}
