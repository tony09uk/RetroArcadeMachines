import { Injectable } from '@angular/core';

import * as _ from 'lodash'; // todo: only import required items, use below
import { map, uniq, property, dropWhile, min, max } from 'lodash';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { FilterTypes } from '../enums/filter-types.enum';

import { Column } from '../models/column.model';
import { HeaderItem } from '../models/header-item';

@Injectable()
export class GridFilterService {
    columns: Column[];
    filterChanged$: Subject<Column> = new Subject<Column>();
    get delimiter(): string {
        return '-';
    }

    initFilters(headers: any, data: any): void {
        this.columns = [];

        Object.keys(headers).forEach((headerKey: string) => {
            const headerItem = headers[headerKey] as HeaderItem;
            let selectedValues;

            if (this.isDistinctDataSetRequired(headerItem)) {
                selectedValues = this.getData(data, headerKey, headerItem.filterType);
            }

            const column = {
                name: headerKey,
                friendlyName: headerItem.friendlyName,
                filterType: headerItem.filterType,
                distinctData: selectedValues,
                width: headerItem.width,
                pipe: headerItem.pipe,
                appliedFilters: headerItem.appliedFilters,
            } as Column;

            this.columns.push(column);
        });
    }

    watchColumnFilterChanged(): Observable<Column> {
        return this.filterChanged$;
    }

    clearFilters(): void {
        const columnsWithFilters = this.columns.filter(c => c.appliedFilters.length > 0);
        for (const column of columnsWithFilters) {
            column.appliedFilters = [];
            this.filterChanged$.next(column);
        }
    }

    updateFilter(columnName: string, value: string[]): void {
        const column = this.columns.find(x => x.name === columnName);
        column.appliedFilters = value;
        this.filterChanged$.next(column);
    }

    getColumn(name: string): Column {
        return this.columns.find(x => x.name === name);
    }

    private getData(data: any, propertyName: string, filterType: FilterTypes): string[] {
        let uniqueValue: string[] = _.uniq<string>(_.map(data, _.property(propertyName)));
        uniqueValue = _.dropWhile(uniqueValue, (o) => o === null);

        if (filterType === FilterTypes.NumberRange) {
            const numberRange: number[] = [];

            const range = uniqueValue.map(v => Number(v));
            numberRange.push(_.min(range));
            numberRange.push(_.max(range));

            uniqueValue = numberRange.map(String);
        }

        return uniqueValue;
    }

    private isDistinctDataSetRequired(headerItem: HeaderItem): boolean {
        const filterType = headerItem.filterType;

        return filterType === FilterTypes.MultiSelect ||
            filterType === FilterTypes.NumberRange;
    }
}
