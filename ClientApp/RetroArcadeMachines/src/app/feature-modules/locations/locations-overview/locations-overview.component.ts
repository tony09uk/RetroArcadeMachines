import { Component, OnInit, PipeTransform } from '@angular/core';

import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

import { Column } from '@shared/modules/table/models/column.model';
import { TableSupportedDataTypes } from '@shared/modules/table/models/table-supported-data-types.model';
import { Table } from '@shared/modules/table/models/table.model';
import { LocationOverview } from '../models/location-overview.model';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-locations-overview',
  templateUrl: './locations-overview.component.html',
  styleUrls: ['./locations-overview.component.scss'],
  providers: [ LocationService ]
})
export class LocationsOverviewComponent implements OnInit {

  table: Table;

  constructor(private _locationService: LocationService) { }

  ngOnInit(): void {
    this._locationService
      .get()
      .pipe(
        take(1),
        map((val: LocationOverview[]) => this.createTable(val, this.createColumn))
      )
      .subscribe(
        (value: Table) => { this.table = value; },
        (error: any) => { console.log(error); }
      );
  }

  private createTable(value: LocationOverview[], createColumn: any): Table {
    let columns: [Column[]];

    value.forEach((item: LocationOverview) => {
      const nameColumn = createColumn( // todo: support imagesUrls
        'name', 'Name', item.name, TableSupportedDataTypes.string);
      const priceColumn = createColumn(
        'entryPrice', 'Entry Price', item.entryPrice, TableSupportedDataTypes.string);
      const yearColumn = createColumn(
        'rating', 'Rating', item.rating, TableSupportedDataTypes.string);
      const townColumn = createColumn(
        'town', 'Town', item.town, TableSupportedDataTypes.string);
      const isChildFriendlyColumn = createColumn(
        'isChildFriendly', 'Child Friendly', item.isChildFriendly, TableSupportedDataTypes.boolean);
      const isFoodServedColumn = createColumn(
        'isFoodServed', 'Food Served', item.isFoodServed, TableSupportedDataTypes.string);
      const detailsColumn = createColumn( // todo: support navigation
        'locationDetails', 'Details', item.id, TableSupportedDataTypes.string);

      const row: Column[] = [nameColumn, priceColumn, yearColumn, townColumn, isChildFriendlyColumn, isFoodServedColumn, detailsColumn];

      if (columns) {
        columns.push(row);
      } else {
        columns = [row];
      }
    });

    return {
      columns: columns,
      shouldUsePagination: false,
      shouldShowFilters: false
    };
  }

  private createColumn(
    columnDef: string,
    friendlyName: string,
    value: string,
    dataType: TableSupportedDataTypes,
    shouldHideAtPixels?: number,
    pipe?: PipeTransform): Column {
    return {
      columnDef: columnDef,
      friendlyName: friendlyName,
      displayOrder: 0,
      data: [value, dataType],
      shouldHideAtPixels: shouldHideAtPixels,
      filter: null,
      pipe: pipe
    };
  }

}
