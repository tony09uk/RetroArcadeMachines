import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@core/modules/grid/grid.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';

@NgModule({
  declarations: [
    LocationsOverviewComponent,
    LocationDetailsComponent
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    LocationsRoutingModule,
    ElementsModule,
    GridModule
  ]
})
export class LocationsModule { }
