import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from '@core/services/http.service';
import { LocationOverview } from '../models/location-overview.model';
import { LocationOverviewTable } from '../models/location-overview-table.model';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { GridDataFactoryService } from '@core/modules/grid/services/grid-data-factory.service';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';

@Injectable()
export class LocationService extends GridDataFactoryService {

    constructor(httpService: HttpService) {
        super(httpService);
     }

    get(): Observable<GridConfig<LocationOverview>> {
        return this.create<LocationOverview, LocationOverviewTable>('locations', this.createColumnHeaders());
        // return this._httpService
        //         .get<LocationOverview[]>('locations');
    }

    private createColumnHeaders(): LocationOverviewTable {
        return {
            id: {
                friendlyName: 'Id',
                filterType: FilterTypes.None,
                appliedFilters: [],
                hideProperty: true
            } as HeaderItem,
            name: {
                friendlyName: 'Name',
                filterType: FilterTypes.String,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            entryPrice: {
                friendlyName: 'Entry Price',
                filterType: FilterTypes.NumberRange,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            rating: {
                friendlyName: 'Rating',
                filterType: FilterTypes.NumberRange,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            town: {
                friendlyName: 'Town',
                filterType: FilterTypes.MultiSelect,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            childFriendly: {
                friendlyName: 'Child Friendly',
                filterType: FilterTypes.MultiSelect,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
            foodServed: {
                friendlyName: 'Food Served',
                filterType: FilterTypes.MultiSelect,
                appliedFilters: [],
                hideProperty: false
            } as HeaderItem,
        } as LocationOverviewTable;
    }
}
