import { PipeTransform } from '@angular/core';

import { FilterTypes } from '../enums/filter-types.enum';

export interface HeaderItem {
  friendlyName: string;
  filterType: FilterTypes;
  pipe?: PipeTransform;
  formatParam?: any;
  appliedFilters: string[];
  width?: number;
  hideProperty: boolean;
  shouldHideAtPixels?: number;
}
