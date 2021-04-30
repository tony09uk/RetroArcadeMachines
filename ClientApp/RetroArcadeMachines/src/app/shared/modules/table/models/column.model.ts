import { PipeTransform } from "@angular/core";
import { TableSupportedDataTypes } from "./table-supported-data-types.model";

export interface Column {
  columnDef: string,
  friendlyName: string,
  displayOrder: number,
  data: [any, TableSupportedDataTypes],
  shouldHideAtPixels?: number,
  filter: any,
  pipe?: PipeTransform
}