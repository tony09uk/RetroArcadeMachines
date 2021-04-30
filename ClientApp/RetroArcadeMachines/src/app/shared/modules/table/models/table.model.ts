import { Column } from "./column.model";

export interface Table {
    columns: [Column[]];
    shouldUsePagination: boolean;
    shouldShowFilters: boolean;
  }