import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';

const routes: Routes = [
  { path: '', component: LocationsOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
