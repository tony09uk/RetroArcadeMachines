import { Component, OnInit, PipeTransform } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

import { Column } from '@shared/modules/table/models/column.model';
import { TableSupportedDataTypes } from '@shared/modules/table/models/table-supported-data-types.model';
import { Table } from '@shared/modules/table/models/table.model';
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
