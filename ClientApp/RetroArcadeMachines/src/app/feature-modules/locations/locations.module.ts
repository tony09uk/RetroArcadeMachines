import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';

import { GridModule } from '@core/modules/grid/grid.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsOverviewComponent } from './locations-overview/locations-overview.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { AddComponent } from './add/add.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FormModule } from '@core/modules/form/form.module';
import { FindLocationComponent } from './add/find-location/find-location.component';
import { AssignGamesComponent } from './add/assign-games/assign-games.component';
import { MoreInformationComponent } from './add/more-information/more-information.component';
import { ConfirmComponent } from './add/confirm/confirm.component';
import { ButtonsModule } from '@core/modules/buttons/buttons.module';
import { MapRequestService } from './services/map-request.service';
import { LoadingModule } from '@core/modules/loading/loading.module';
import { ThankyouComponent } from './add/thankyou/thankyou.component';

@NgModule({
  declarations: [
    LocationsOverviewComponent,
    LocationDetailsComponent,
    AddComponent,
    FindLocationComponent,
    AssignGamesComponent,
    MoreInformationComponent,
    ConfirmComponent,
    ThankyouComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    ReactiveFormsModule, // todo: can I remove this?
    FormsModule, // todo: can I remove this?
    ElementsModule,
    GooglePlaceModule,
    GridModule,
    GoogleMapsModule,
    FormModule,
    ButtonsModule,
    LoadingModule
  ],
  providers: [
    MapRequestService
  ]
})
export class LocationsModule { }
