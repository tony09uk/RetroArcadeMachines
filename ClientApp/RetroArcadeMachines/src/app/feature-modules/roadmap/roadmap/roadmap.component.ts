import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/operators';

import { TableSupportedDataTypes } from '@shared/modules/table/models/table-supported-data-types.model';
import { Table } from '@shared/modules/table/models/table.model';
import { YesNoPipe } from '@shared/pipes/yes-no.pipe';

import { RoadmapResponse } from '../models/roadmap-response';
import { RoapmapService } from '../services/roapmap.service';
import { Column } from '@shared/modules/table/models/column.model';
import { PipeTransform } from '@angular/core';
import { AddPercentSymbolPipe } from '@shared/pipes/add-percent-symbol.pipe';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  providers: [ RoapmapService ]
})
export class RoadmapComponent implements OnInit {

  constructor(private _roadmapService: RoapmapService) { }

  table: GridConfig<RoadmapResponse>;

  ngOnInit(): void {
    this._roadmapService
      .get()
      .pipe(
        take(1),
      ).subscribe(
        (response: GridConfig<RoadmapResponse>) => { this.table = response; },
        (error: HttpErrorResponse) => { console.log(error); }
      );
  }

}
