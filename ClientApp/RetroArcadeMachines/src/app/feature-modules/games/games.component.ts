import { PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/internal/operators/map';

import { Column } from '@shared/modules/table/models/column.model';
import { TableSupportedDataTypes } from '@shared/modules/table/models/table-supported-data-types.model';
import { Table } from '@shared/modules/table/models/table.model';
import { GamesService } from './services/games.service';
import { GameOverview } from './models/game-overview.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
  providers: [ GamesService ]
})
export class GamesComponent implements OnInit {

  table: Table;

  constructor(private _gamesService: GamesService) { }

  ngOnInit(): void {
    this._gamesService
      .get()
      .pipe(
        take(1),
        map((val: GameOverview[]) => this.createTable(val, this.createColumn))
      )
      .subscribe(
        (value: Table) => { this.table = value; },
        (error: any) => { console.log(error); }
      );
  }

  private createTable(value: GameOverview[], createColumn: any): Table {
    let columns: [Column[]];

    value.forEach((item: GameOverview) => {
      const thumbnailColumn = createColumn( // todo: support imagesUrls
        'thumbnail', 'Thumbnail', item.thumbnailUrl, TableSupportedDataTypes.string);
      const titleColumn = createColumn(
        'title', 'Title', item.title, TableSupportedDataTypes.string);
      const yearColumn = createColumn(
        'year', 'Year', item.releaseYear, TableSupportedDataTypes.string);
      const manufacturerColumn = createColumn(
        'manufacturer', 'Manufacturer', item.developerList.join(', '), TableSupportedDataTypes.number);
      const genreColumn = createColumn(
        'genre', 'Genre', item.genreList.join(', '), TableSupportedDataTypes.number);
      const maxPlayersColumn = createColumn(
        'maxPlayers', 'MaxPlayers', item.maxPlayers, TableSupportedDataTypes.number);
      const detailsColumn = createColumn( // todo: support navigation
        'gameDetails', 'Information', item.id, TableSupportedDataTypes.string);
      const locationsColumn = createColumn( // todo: support navigation
        'locations', 'Locations', item.id, TableSupportedDataTypes.string);

      const row: Column[] = [thumbnailColumn, titleColumn, yearColumn, manufacturerColumn, genreColumn, maxPlayersColumn, detailsColumn, locationsColumn];

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
