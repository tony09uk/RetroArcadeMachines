import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  PipeTransform,
  ViewChild
} from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KeyValuePair } from 'src/app/shared/models/key-value-pair.model'; //todo: use alias

import { FilterTypes } from '../enums/filter-types.enum';
import { HeaderTypes } from '../enums/header-types.enum';
import { Column } from '../models/column.model';
import { GridConfig } from '../models/grid-config.model';

import { GridFilterService } from '../services/grid-filter-service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [GridFilterService]
})
export class GridComponent<T> implements OnInit {

  @Input() gridConfig: GridConfig<T>;

  @Output() rowClickedEvent = new EventEmitter<T>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource = new MatTableDataSource<T>();
  hideColumnValues: KeyValuePair<string, boolean>[] = [];
  columnFilters: string[] = [];
  isFiltered: boolean = false;
  objectKeys = Object?.keys;
  headerTypes = HeaderTypes;
  filterValues: { [key: string]: Column } = { };

  constructor(private _gridFilterService: GridFilterService) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setColumnVisibility();
  }

  ngOnInit(): void {
    this.setDataSourceFilterPredicate();
    this.dataSource.data = this.gridConfig.tableData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this._gridFilterService.initFilters(this.gridConfig.columnHeader, this.dataSource.data);
    this._gridFilterService
      .watchColumnFilterChanged()
      .subscribe(
        column => { this.filterValue(column); } );

    for (const objKey of Object.keys(this.gridConfig.columnHeader)) {
      const filterName = this.getFilterDef(objKey);
      this.columnFilters.push(filterName);
    }

    this.setColumnVisibility();
  }

  clearFilters(): void {
    this._gridFilterService.clearFilters();
    this.isFiltered = false;
  }

  format(value: any, pipeFormatter: PipeTransform, key: string, pipeFormatParam?: string) {
    if (!pipeFormatter) {
      return value[key];
    }

    if (!pipeFormatParam) {
      return value = pipeFormatter.transform(value[key]);
    }

    return pipeFormatter.transform(value[key], pipeFormatParam);
  }

  rowClicked(row: T): void {
    this.rowClickedEvent.emit(row);
  }

  getFilterDef(propertyName: string): string {
    return propertyName + '-description';
  }

  shouldHideColumnValue(key: any, element: any): boolean {
    if (!element) {
      return false;
    }

    const item = element as [Column];

    const column = item.find(x => x.name === key);
    const pixelCount = column !== undefined && column?.shouldHideAtPixels !== undefined ? column.shouldHideAtPixels : 0;
    return this.shouldHideColumn(pixelCount);
  }

  setVisisibility(key: string, alwaysHide: boolean): boolean {
    if (alwaysHide) {
      return true;
    }

    const shouldHide = this.hideColumnValues.find(x => x.key === key);
    return !shouldHide ? false : shouldHide.value;
  }

  private setColumnVisibility(): void {
    Object.keys(this.gridConfig.columnHeader).forEach((key: string) => {
      const hiddenValue = this.hideColumnValues.find(x => x.key === key);
      const column = this.gridConfig.columnHeader[key] as Column;
      const pixelValue = !column.shouldHideAtPixels ? 0 : column.shouldHideAtPixels;

      if (hiddenValue) {
        hiddenValue.value = this.shouldHideColumn(pixelValue);
      } else {
        this.hideColumnValues.push({key: key, value: this.shouldHideColumn(pixelValue)});
      }
    });
  }

  private shouldHideColumn(widthToHide: number): boolean {
    return window.innerWidth < widthToHide;
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
  private setDataSourceFilterPredicate(): void {
    this.dataSource.filterPredicate = function customFilter(data: any, filter): boolean {
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
          for (let index = 0; index < searchTerm.appliedFilters.length; index++) {
            const filterEntry = searchTerm.appliedFilters[index] as string;
            if (filterEntry && data[searchTerm.name]) {
              if (searchTerm.filterType === FilterTypes.MultiSelect) {
                if (typeof filterEntry === 'boolean') {
                  showRecordForFilters = showRecordForFilters || (data[searchTerm.name] === filterEntry);
                } else {
                  showRecordForFilters = showRecordForFilters || (data[searchTerm.name].toString().toLowerCase() === filterEntry.toLowerCase());
                }
              } else {
                showRecordForFilters = showRecordForFilters || (data[searchTerm.name].toString().toLowerCase().indexOf(filterEntry.toLowerCase()) !== -1);
              }
            } else {
              if (filterEntry === '') {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name] === filterEntry || !data[searchTerm.name];
              } else {
                showRecordForFilters = showRecordForFilters || data[searchTerm.name] === filterEntry;
              }
            }
          }
        }
        showRecord = showRecord && showRecordForFilters;
      }
      return showRecord;
    };
  }
}
