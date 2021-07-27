import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { HttpService } from '@core/services/http.service';

import { GridConfig } from '../models/grid-config.model';

@Injectable({
    providedIn: 'root'
})
export class GridDataFactoryService {

    constructor(private _httpService: HttpService) { }

    create<T, K>(dataEndpoint: string, columnHeders: K): Observable<GridConfig<T>> {
        return this._httpService
            .get<T[]>(dataEndpoint)
            .pipe(
                take(1),
                map((data: T[]) => this.createGridConfig(data, columnHeders))
            );
    }

    private createGridConfig<T, K>(data: T[], columnHeaders: K): GridConfig<T> {
        const gridConfig = new GridConfig<T>();
        gridConfig.tableData = data;

        gridConfig.columnHeader = columnHeaders;

        return gridConfig;
    }
}
