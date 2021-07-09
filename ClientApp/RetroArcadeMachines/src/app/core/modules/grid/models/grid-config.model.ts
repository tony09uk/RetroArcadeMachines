export class GridConfig<T> {
    tableData: Array<T>;
    columnHeader: any; // todo: add generic data type
    enablePagination: boolean = true;
    enableFiltering: boolean = true;
    hideFilterbar: boolean = false;
    disableSort: boolean = false;
    widget?: any; // todo: add base data type
}
