import { Component, HostListener, Input, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';

import { KeyValuePair } from '../../models/key-value-pair.model';
import { Column } from './models/column.model';
import { Table } from './models/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() tableDef: Table
  constructor() { }

  objectKeys = Object?.keys;
  displayedColumns: string[] = [];
  // todo: refactor data being passed into datasource. currently it is inefficent due to multiple loop occouring
  tableDataSource = new MatTableDataSource<any>();
  hideIsStarted = false;
  hideProgress = false;

  hideColumnValues: KeyValuePair<string, boolean>[] = [];
  friendlyNames: KeyValuePair<string, string>[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setColumnVisibility();
  }

  ngOnInit(): void {
    this.tableDef.columns[0].forEach((item: Column) => {
      this.displayedColumns.push(item.columnDef);
      this.friendlyNames.push({key: item.columnDef, value: item.friendlyName});

      const pixelValue = !item.shouldHideAtPixels ? 0 : item.shouldHideAtPixels;
      this.hideColumnValues.push({key: item.columnDef, value: this.shouldHideColumn(pixelValue)})
    });

    this.tableDataSource.data = this.tableDef.columns;
    this.setColumnVisibility();
  }

  shouldHideColumnValue(key: any, element: any): boolean {
    if (!element) {
      return false;
    }

    const item = element as [Column];

    const column = item.find(x => x.columnDef === key);
    const pixelCount = column !== undefined && column?.shouldHideAtPixels !== undefined ? column.shouldHideAtPixels : 0;
    return this.shouldHideColumn(pixelCount);
  }

  getValue(key: any, element: [Column]): string {
    const column = this.getColumn(key, element);
    if (!column) {
      return '';
    }

    const value = column.data[0];

    if (column.pipe) {
      return column.pipe.transform(value);
    }

    return value;
  }

  getFriendlyName(key: string): string | undefined {
    return this.friendlyNames.find(x => x.key === key)?.value;
  }

  setVisisibility(key: string): boolean {
    const shouldHide = this.hideColumnValues.find(x => x.key === key);
    return !shouldHide ? false : shouldHide.value;
  }

  private getColumn(key: any, element: [Column]): Column | undefined {
    const column = element.find(x => x.columnDef === key);
    return column;
  }

  private setColumnVisibility(): void {
    for(let column of this.tableDataSource.data[0]) {
      column = column as Column; // todo: remove this when data dataType is defined in matDataSource
      let hiddenValue = this.hideColumnValues.find(x => x.key === column.columnDef);

      if(!hiddenValue) {
        continue;
      }

      hiddenValue.value = this.shouldHideColumn(column.shouldHideAtPixels);
    }
  }

  private shouldHideColumn(widthToHide: number): boolean {
    return window.innerWidth < widthToHide ? true : false;
  }
}
