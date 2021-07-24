import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnDestroy, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

import { takeWhile } from 'rxjs/operators';

import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

@Component({
  selector: 'app-multiselect-filter',
  templateUrl: './multiselect-filter.component.html',
  styleUrls: ['./multiselect-filter.component.scss']
})
export class MultiselectFilterComponent implements OnInit, OnDestroy {

  @Input() columnName: string;
  @Input() data: string[];

  multiSelect: FormControl = new FormControl();
  multiSelectList: string[] = [];
  friendlyName: string;
  width: string;

  constructor(private _gridFilterService: GridFilterService) { }

  private _column: Column;
  private _pipe: PipeTransform;
  private _isInstantiated: boolean = true;

  ngOnInit(): void {
    this._column = this._gridFilterService.getColumn(this.columnName);
    this._pipe = this._column.pipe;

    this.width = this._column.width?.toString();
    this.friendlyName = this._column.friendlyName.toLocaleLowerCase();

    this.multiSelectList = this._column.distinctData;

    this._gridFilterService
      .watchColumnFilterChanged()
      .pipe(
        takeWhile(() => this._isInstantiated)
      ).subscribe((column: Column) => this.updateFilter(column));
  }

  ngOnDestroy(): void {
    this._isInstantiated = false;
  }

  updateFilter(column: Column): void {
    if (this._column.name === column.name) {
      this.multiSelect.setValue(column.appliedFilters);
    }
  }

  onChange(event: []): void {
    this._gridFilterService.updateFilter(this.columnName, event);
  }

  pipeValue(value: string): string {
    if (!this._pipe) {
      return value;
    }
    return this._pipe.transform(value);
  }

}
