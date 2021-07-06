export class GridConfig<T, K, V> {
    tableData: Array<T>; // todo: add generic data type
    columnHeader: K; // todo: add generic data type
    enablePagination: boolean = true;
    enableFiltering: boolean = true;
    hideFilterbar: boolean = false;
    disableSort: boolean = false;
    widget?: V; // todo: add generic data type
}
