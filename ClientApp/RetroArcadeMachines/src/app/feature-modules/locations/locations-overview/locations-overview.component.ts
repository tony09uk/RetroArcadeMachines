import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/internal/operators/take';

import { LocationOverviewService } from '../services/location-overview.service';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { LocationOverview } from '@shared/models/location-overview.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-locations-overview',
  templateUrl: './locations-overview.component.html',
  styleUrls: ['./locations-overview.component.scss'],
  providers: [ LocationOverviewService ]
})
export class LocationsOverviewComponent implements OnInit {

  table: GridConfig<LocationOverview>;

  constructor(
    private _router: Router,
    private _locationService: LocationOverviewService) { }

  ngOnInit(): void {
    this._locationService
      .get()
      .pipe(
        take(1),
      )
      .subscribe(
        (value: GridConfig<LocationOverview>) => { this.table = value; },
        (error: HttpErrorResponse) => { console.log(error); }
      );
  }

  onRowClick(row: LocationOverview): void {
    this._router.navigate(['locations/details', row.id ]);
  }
}
