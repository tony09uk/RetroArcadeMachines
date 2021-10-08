import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { HttpService } from '@core/services/http.service';

import { GridConfig } from '../models/grid-config.model';

@Injectable({
    providedIn: 'root'
})
export class GridDataFactoryService {

    constructor(protected _httpService: HttpService) { }

    create<T, K>(value: string | T[], columnHeders: K): Observable<GridConfig<T>> {
        if (!value) {
            throw new Error('the provided value was null. this needs to be an endpoint or the data that will populate the table');
        }

        if (typeof (value) === 'string') {
            return this._httpService
                .get<T[]>(value as string)
                .pipe(
                    take(1),
                    map((data: T[]) => this.createGridConfig(data, columnHeders))
                );
        }

        return of(this.createGridConfig(value, columnHeders));
    }

    private createGridConfig<T, K>(data: T[], columnHeaders: K): GridConfig<T> {
        const gridConfig = new GridConfig<T>();
        gridConfig.tableData = data;

        gridConfig.columnHeader = columnHeaders;

        return gridConfig;
    }
}
