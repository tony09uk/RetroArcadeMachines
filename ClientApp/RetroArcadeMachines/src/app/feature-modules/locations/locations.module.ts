import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';

import { GridModule } from '@core/modules/grid/grid.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { AddComponent } from './add/add.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormModule } from '@core/modules/form/form.module';

@NgModule({
  declarations: [
    LocationsOverviewComponent,
    LocationDetailsComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    GooglePlaceModule,
    LocationsRoutingModule,
    ElementsModule,
    GridModule,
    GoogleMapsModule,
    FormModule,
    ElementsModule
  ]
})
export class LocationsModule { }
