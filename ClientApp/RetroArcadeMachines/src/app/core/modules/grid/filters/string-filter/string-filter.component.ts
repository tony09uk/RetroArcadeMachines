import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

@Component({
  selector: 'app-string-filter',
  templateUrl: './string-filter.component.html',
  styleUrls: ['./string-filter.component.scss']
})
export class StringFilterComponent implements OnInit, OnDestroy {

  @Input() columnName: string;
  @Input() filterValue: string[];
  filter: string;
  hide: boolean = false;
  width: number;

  constructor(private _gridFilterService: GridFilterService) { }

  private _column: Column;
  private _isInstantiated: boolean = true;

  ngOnInit(): void {
    this._column = this._gridFilterService.getColumn(this.columnName);
    this.filter = this._column.appliedFilters.join(',');
    this.width = this._column.width;

    this._gridFilterService
      .watchColumnFilterChanged()
      .pipe(
        takeWhile(() => this._isInstantiated)
      ).subscribe(
        value => this.updateFilter(value),
        error => console.log(error)
      );
  }

  ngOnDestroy(): void {
    this._isInstantiated = false;
  }

  onChange(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      return;
    }
    this.emitValue();
  }

  onClear(): void {
    this.filter = '';
    this.emitValue();
  }

  updateFilter(column: Column): void {
    if (this._column.name === column.name) {
      this.filter = column.appliedFilters.join(',');
    }
  }

  private emitValue(): void {
    let updatedValue: string[] = [];

    if (this.filter) {
      updatedValue = this.filter.split(',');
    }
    this._gridFilterService.updateFilter(this.columnName, updatedValue);
  }
}
