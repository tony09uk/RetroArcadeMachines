import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/internal/operators/take';

import { LocationOverview } from '../models/location-overview.model';
import { LocationService } from '../services/location.service';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';

@Component({
  selector: 'app-locations-overview',
  templateUrl: './locations-overview.component.html',
  styleUrls: ['./locations-overview.component.scss'],
  providers: [ LocationService ]
})
export class LocationsOverviewComponent implements OnInit {

  table: GridConfig<LocationOverview>;

  constructor(private _locationService: LocationService) { }

  ngOnInit(): void {
    this._locationService
      .get()
      .pipe(
        take(1),
      )
      .subscribe(
        (value: GridConfig<LocationOverview>) => { this.table = value; },
        (error: any) => { console.log(error); }
      );
  }
}
