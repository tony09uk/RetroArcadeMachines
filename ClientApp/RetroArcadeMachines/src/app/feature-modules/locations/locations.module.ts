import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';


@NgModule({
  declarations: [LocationsComponent],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ComingSoonModule
  ]
})
export class LocationsModule { }
