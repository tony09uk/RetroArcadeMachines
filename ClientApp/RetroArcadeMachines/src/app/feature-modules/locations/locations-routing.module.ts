import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';

const routes: Routes = [
  { path: '', component: LocationsOverviewComponent },
  { path: 'details/:id', component: LocationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
