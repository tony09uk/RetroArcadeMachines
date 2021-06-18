import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { TableModule } from '@shared/modules/table/table.module';
import { ElementsModule } from '@shared/modules/elements/elements.module';


@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ElementsModule,
    TableModule
  ]
})
export class LocationsModule { }
