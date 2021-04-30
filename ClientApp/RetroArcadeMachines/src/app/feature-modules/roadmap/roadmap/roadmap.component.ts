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

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  providers: [ RoapmapService ]
})
export class RoadmapComponent implements OnInit {

  constructor(private _roadmapService: RoapmapService) { }

  displayedColumns: string[] = ['name', 'description', 'isStarted', 'percentageCompleted'];
  roadmapTableDataSource: RoadmapResponse[] = [];
  table: Table;

  ngOnInit(): void {
    this._roadmapService
      .get()
      .pipe(
        take(1),
        map(val => this.createTable(val, this.createColumn))
      ).subscribe(
        value => {this.table = value;  console.log(this.table)},
        error => console.log(error)
      );
  }

  private createTable(value: RoadmapResponse[], createColumn: any): Table {
    let columns: [Column[]];

    value.forEach((item: RoadmapResponse) => {
      const nameColumn = createColumn('name', 'Name', item.name, TableSupportedDataTypes.string);
      const descColumn = createColumn('description', 'Detail', item.description, TableSupportedDataTypes.string);
      const isStartedColumn = createColumn('isStarted', 'Started', item.isStarted.toString(), TableSupportedDataTypes.boolean);
      const perCompleteColumn = createColumn('percentageCompleted', 'Progress', item.percentageCompleted.toString(), TableSupportedDataTypes.number);
      const row:Column[] = [nameColumn, descColumn, isStartedColumn, perCompleteColumn];
      
      if(columns) {
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

  private createColumn(columnDef: string, friendlyName: string, value: string, dataType: TableSupportedDataTypes, shouldHideAtPixels?: number, pipe?: PipeTransform): Column {
    return {
      columnDef: columnDef,
      friendlyName: friendlyName,
      displayOrder: 0,
      data: [value, dataType],
      shouldHideAtPixels: shouldHideAtPixels,
      filter: null,
      pipe: pipe
    }
  }
}
