import { PipeTransform } from '@angular/core';
import { FilterTypes } from '../enums/filter-types.enum';

export interface Column {
  name: string;
  friendlyName: string;
  filterType: FilterTypes;
  distinctData: string[];
  pipe?: PipeTransform;
  formatParam?: any;
  appliedFilters: string[];
  width?: number;
  widget?: any;
  shouldHideAtPixels?: number;
}
