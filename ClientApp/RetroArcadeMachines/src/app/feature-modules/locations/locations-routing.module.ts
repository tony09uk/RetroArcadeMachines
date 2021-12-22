import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationDetailsComponent } from './location-details/location-details.component';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';
import { AddComponent } from './add/add.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';

// todo: makes routes type safe
const routes: Routes = [
  { path: '', component: LocationsOverviewComponent },
  { path: 'details/:id', component: LocationDetailsComponent },
  { path: 'add', component: AddComponent, canActivate: [ AuthGuard ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
