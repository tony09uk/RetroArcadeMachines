import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { TableModule } from '@shared/modules/table/table.module';
import { ElementsModule } from '@shared/modules/elements/elements.module';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';


@NgModule({
  declarations: [
    LocationsOverviewComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ElementsModule,
    TableModule
  ]
})
export class LocationsModule { }
