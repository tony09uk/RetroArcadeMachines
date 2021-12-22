import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';

import { CellContentTypes } from '@core/modules/grid/enums/cell-content-types.enum';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { GridDataFactoryService } from '@core/modules/grid/services/grid-data-factory.service';
import { HttpService } from '@core/services/http.service';
import { GameOverview } from 'src/app/shared/models/game-overview.model';

import { GamesCollectionTable } from '../models/games-collection-table.model';
import { LocationDetails } from '../models/location-details.model';

@Injectable()
export class LocationDetailsService extends GridDataFactoryService {

    constructor(httpService: HttpService) {
        super(httpService);
    }

    get(id: string): Observable<LocationDetails> {
        const params = new HttpParams().set('id', id);

        return this._httpService
            .get<LocationDetails>('LocationDetails', params)
            .pipe(
                take(1),
                mergeMap((response: LocationDetails) => this.getGamesCollectionTable(response)),
            );
    }

    private getGamesCollectionTable(locationDetails: LocationDetails): Observable<LocationDetails> {
        return this.create<GameOverview, GamesCollectionTable>(locationDetails.gameOverviewList, this.createColumnHeaders())
                .pipe(
                    take(1),
                    tap((gridConfig: GridConfig<GameOverview>) => locationDetails.gameCollectionTable = gridConfig),
                    map(() => locationDetails)
                );
    }

    private createColumnHeaders(): GamesCollectionTable {
        return {
            id: {
                friendlyName: 'Id',
                filterType: FilterTypes.String,
                appliedFilters: [],
                hideProperty: true
            } as HeaderItem,
            thumbnailUrl: {
                friendlyName: '',
                filterType: FilterTypes.None,
                cellContentType: CellContentTypes.Image,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            title: {
                friendlyName: 'Title',
                filterType: FilterTypes.String,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
        };
    }
}
