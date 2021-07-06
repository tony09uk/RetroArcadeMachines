import { Component, Input, OnInit } from '@angular/core';

import { Column } from '../models/column.model';
import { FilterTypes } from '../enums/filter-types.enum';
import { GridFilterService } from '../services/grid-filter-service';

@Component({
  selector: 'app-filter-selector',
  templateUrl: './filter-selector.component.html',
})
export class FilterSelectorComponent implements OnInit {

  @Input() columnName: string;
  column: Column;
  appliedFilterText: string;
  filterTypes = FilterTypes;

  constructor(private _gridFilterService: GridFilterService) { }

  ngOnInit(): void {
    this.column = this._gridFilterService.getColumn(this.columnName);
  }
}
