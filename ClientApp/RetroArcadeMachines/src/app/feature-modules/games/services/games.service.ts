import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from '@core/services/http.service';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { CellContentTypes } from '@core/modules/grid/enums/cell-content-types.enum';
import { GridDataFactoryService } from '@core/modules/grid/services/grid-data-factory.service';

import { GameOverview } from '../models/game-overview.model';
import { GamesTable } from '../models/games-table.model';

@Injectable()
export class GamesService extends GridDataFactoryService {

    constructor(httpService: HttpService) {
        super(httpService);
     }

    get(): Observable<GridConfig<GameOverview>> {
        return this.create<GameOverview, GamesTable>('games', this.createColumnHeaders());
    }

    private createColumnHeaders(): GamesTable {
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
            releaseYear: {
                friendlyName: 'Release Year',
                filterType: FilterTypes.NumberRange,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            maxPlayers: {
                friendlyName: 'Max Players',
                filterType: FilterTypes.String,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
        };
    }
}
