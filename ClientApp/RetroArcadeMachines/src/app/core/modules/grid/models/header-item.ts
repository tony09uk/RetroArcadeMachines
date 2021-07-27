import { PipeTransform } from '@angular/core';
import { CellContentTypes } from '../enums/cell-content-types.enum';

import { FilterTypes } from '../enums/filter-types.enum';

export interface HeaderItem {
  friendlyName: string;
  filterType: FilterTypes;
  cellContentType?: CellContentTypes;
  pipe?: PipeTransform;
  formatParam?: any;
  appliedFilters: string[];
  width?: number;
  hideProperty: boolean;
  shouldHideAtPixels?: number;
}
