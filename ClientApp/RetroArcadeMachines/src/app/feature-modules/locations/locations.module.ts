import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@core/modules/grid/grid.module';
import { ElementsModule } from '@shared/modules/elements/elements.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';

@NgModule({
  declarations: [
    LocationsOverviewComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ElementsModule,
    GridModule
  ]
})
export class LocationsModule { }
