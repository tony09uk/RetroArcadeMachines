import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort/sort';
import { MatTableDataSource } from '@angular/material/table/table-data-source';

import { KeyValuePair } from 'src/app/shared/models/key-value-pair.model';
import { FilterTypes } from '../enums/filter-types.enum';
import { HeaderTypes } from '../enums/header-types.enum';
import { Column } from '../models/column.model';
import { GridConfig } from '../models/grid-config.model';

import { Table } from '../models/table.model';
import { GridFilterService } from '../services/grid-filter-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [ GridFilterService ]
})
export class GridComponent<T, K, V> implements OnInit {

  @Input() gridConfig: GridConfig<T, K, V>; // todo: be aware this generic type on a component could cause issues

  @Output() rowClickedEvent = new EventEmitter<T>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource();
  columnFilters: string[] = [];
  isFiltered: boolean = false;
  objectKeys = Object?.keys;
  headerTypes = HeaderTypes;
  filterValues = {};


  constructor(private _gridFilterService: GridFilterService) { }

  ngOnInit(): void {
    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.data = this.gridConfig.tableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._gridFilterService.initFilters(this.gridConfig.columnHeader, this.dataSource.data);
    this._gridFilterService
      .watchColumnFilterChanged()
      .subscribe(
        column => this.filterValue(column),
        error => console.log(error) // todo: log this error
      );

    for (const objKey of Object.keys(this.gridConfig.columnHeader)) {
      const filterName = this.getFilterDef(objKey);
      this.columnFilters.push(filterName);
    }
  }

  clearFilters(): void {
    this._gridFilterService.clearFilters();
    this.isFiltered = false;
  }

  // todo: can pipeFormatter be a type of pipeTransform?
  format(value: any, pipeFormatter: any, key: string, pipeFormatParam?: string) {
    if(!pipeFormatter) {
      return value[key];
    }

    if(!pipeFormatParam) {
      return value = pipeFormatter.transform(value[key]);
    }

    return pipeFormatter.transorm(value[key], pipeFormatParam);
  }

  rowClicked(row: T): void {
    this.rowClickedEvent.emit(row);
  }

  getFilterDef(propertyName: string): string {
    return propertyName + '-description';
  }

  getRecord(name: any, key:string): {

  }

  private filterValue(column: Column): void {
    if (!column.appliedFilters || column.appliedFilters.length === 0) {
      delete this.filterValues[column.name];
      if (Object.keys(this.filterValues).length === 0) {
        this.isFiltered = false;
      }
    } else {
      this.filterValues[column.name] = column;
      this.isFiltered = true;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // todo: change any to T once test is in progress
  private createFilter(): (data: any, filter: string) => boolean {
    return (data, filter) => {
      const searchTerms = JSON.parse(filter);
      let showRecord = true;

      for (const searchTermKey of Object.keys(searchTerms)) {
        const searchTerm = searchTerms[searchTermKey] as Column;

        let showRecordForFilters = false;
        if (searchTerms.filterType === FilterTypes.NumberRange) {
          const appliedFilter = searchTerm.appliedFilters[0].split('to');
          const fromFilter = Number(appliedFilter[0]);
          const toFilter = Number(appliedFilter[1]);

          const dataItem = Number(data[searchTerm.name]);
          if (dataItem <= fromFilter && dataItem >= toFilter) {
            showRecordForFilters = true;
          }
        } else if (searchTerms.filterType === FilterTypes.DateRange) {
          const appliedFilter = searchTerm.appliedFilters[0].split(' - ');
          const fromFilter = new Date(appliedFilter[0] + 'T00:00:00');
          const toFilter = new Date(appliedFilter[1] + 'T23:59:59');

          const dataItem = new Date(data[searchTerm.name]);
          if (dataItem.getTime() <= toFilter.getTime() && dataItem.getTime() >= fromFilter.getTime()) {
            showRecordForFilters = true;
          }
        } else {
          for(let index = 0; index < searchTerm.appliedFilters.length; index++) {
            const filterEntry = searchTerm.appliedFilters[index] as string;
            if (filterEntry && data[searchTerm.name]) {
              if (searchTerm.filterType === FilterTypes.MultiSelect) {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name].toString().toLower() === filterEntry.toLowerCase();
              } else {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name].toString().toLower().indexOf(filterEntry.toLowerCase()) !== -1;
              }
            } else {
              if (filterEntry === '') {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name] === filterEntry || ! data[searchTerm.name];
              } else {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name] === filterEntry || ! data[searchTerm.name];
              }
            }
          }
        }
        
      }
      return showRecord;
    };
  }
}

  // @Input() tableDef: Table;
  // constructor() { }

  // objectKeys = Object?.keys;
  // displayedColumns: string[] = [];
  // // todo: refactor data being passed into datasource. currently it is inefficent due to multiple loop occouring
  // tableDataSource = new MatTableDataSource<any>();
  // hideIsStarted = false;
  // hideProgress = false;

  // hideColumnValues: KeyValuePair<string, boolean>[] = [];
  // friendlyNames: KeyValuePair<string, string>[] = [];

  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   this.setColumnVisibility();
  // }

  // ngOnInit(): void {
  //   this.tableDef.columns[0].forEach((item: Column) => {
  //     this.displayedColumns.push(item.columnDef);
  //     this.friendlyNames.push({key: item.columnDef, value: item.friendlyName});

  //     const pixelValue = !item.shouldHideAtPixels ? 0 : item.shouldHideAtPixels;
  //     this.hideColumnValues.push({key: item.columnDef, value: this.shouldHideColumn(pixelValue)})
  //   });

  //   this.tableDataSource.data = this.tableDef.columns;
  //   this.setColumnVisibility();
  // }

  // shouldHideColumnValue(key: any, element: any): boolean {
  //   if (!element) {
  //     return false;
  //   }

  //   const item = element as [Column];

  //   const column = item.find(x => x.columnDef === key);
  //   const pixelCount = column !== undefined && column?.shouldHideAtPixels !== undefined ? column.shouldHideAtPixels : 0;
  //   return this.shouldHideColumn(pixelCount);
  // }

  // getValue(key: any, element: [Column]): string {
  //   const column = this.getColumn(key, element);
  //   if (!column) {
  //     return '';
  //   }

  //   const value = column.data[0];

  //   if (column.pipe) {
  //     return column.pipe.transform(value);
  //   }

  //   return value;
  // }

  // getFriendlyName(key: string): string | undefined {
  //   return this.friendlyNames.find(x => x.key === key)?.value;
  // }

  // setVisisibility(key: string): boolean {
  //   const shouldHide = this.hideColumnValues.find(x => x.key === key);
  //   return !shouldHide ? false : shouldHide.value;
  // }

  // private getColumn(key: any, element: [Column]): Column | undefined {
  //   const column = element.find(x => x.columnDef === key);
  //   return column;
  // }

  // private setColumnVisibility(): void {
  //   for (let column of this.tableDataSource.data[0]) {
  //     column = column as Column; // todo: remove this when data dataType is defined in matDataSource
  //     const hiddenValue = this.hideColumnValues.find(x => x.key === column.columnDef);

  //     if (!hiddenValue) {
  //       continue;
  //     }

  //     hiddenValue.value = this.shouldHideColumn(column.shouldHideAtPixels);
  //   }
  // }

  // private shouldHideColumn(widthToHide: number): boolean {
  //   return window.innerWidth < widthToHide ? true : false;
  // }
// }
