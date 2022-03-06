import { Component, Input, OnInit } from '@angular/core';

import { min, max } from 'lodash';
import { takeWhile } from 'rxjs/operators';

import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

@Component({
  selector: 'app-number-range-filter',
  templateUrl: './number-range-filter.component.html',
  styleUrls: ['./number-range-filter.component.scss']
})
export class NumberRangeFilterComponent implements OnInit {

  @Input() data: string[];
  @Input() columnName: string;
  @Input() filterValue: number;

  width: string;
  minValue: number;
  maxValue: number;
  minSelected: number;
  maxSelected: number;

  constructor(private _gridFilterService: GridFilterService) { }

  private _column: Column;
  private _isInstantiated: boolean = true;
  private _delimeter: string = '-';

  ngOnInit(): void {
    this._column = this._gridFilterService.getColumn(this.columnName);

    if (this._column.width){
      const headerPadding = 10;
      const calculatedWidth = this._column.width / 2 - headerPadding;
      this.width = calculatedWidth.toString();
    }

    if (this.data) {
      const range = this.data.map(v => Number(v));
      this.minValue = min(range);
      this.maxValue = max(range);
    }

    if (!this.minValue) {
      this.minValue = 0;
    }

    if (!this.maxValue) {
      this.maxValue = 0;
    }

    this.resetSelectedValues();

    this._gridFilterService
      .watchColumnFilterChanged()
      .pipe(
        takeWhile(() => this._isInstantiated)
      ).subscribe((values: Column) => this.updateFilter(values));
  }

  onChangeMin(): void {
    this.setSelectedValues(this.minSelected, this.maxSelected);
    this.emitValue();
  }

  onChangeMax(): void {
    this.setSelectedValues(this.minSelected, this.maxSelected);
    this.emitValue();
  }

  onSliderChange($event: any): void {
    this.setSelectedValues($event[0], $event[1]);
    this.emitValue();
  }

  updateFilter(column: Column): void {
    if (this._column.name !== column.name) {
      return;
    }

    if (column.appliedFilters?.length === 0) {
      this.resetSelectedValues();
      return;
    }

    if (column.appliedFilters?.length === 1) {
      const filterValue = column.appliedFilters[0].split(this._delimeter);
      this.setSelectedValues(Number(filterValue[0]), Number(filterValue[1]));
    }
  }

  onChange(): void {
    this.emitValue();
  }

  private emitValue(): void {
    let updatedValue = [this.minSelected.toString() + this._gridFilterService.delimiter + this.maxSelected.toString()];

    if (this.isFilterDefaultValues()) {
      updatedValue = [];
    }

    this._gridFilterService.updateFilter(this.columnName, updatedValue);
  }

  private isFilterDefaultValues(): boolean {
    return this.minSelected === this.minValue &&
      this.maxSelected === this.maxValue;
  }

  private resetSelectedValues(): void {
    this.setSelectedValues(this.minValue, this.maxValue);
  }

  private setSelectedValues(minValue: number, maxValue: number): void {
    this.minSelected = minValue;
    this.maxSelected = maxValue;
  }
}
