import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { YesNoPipe } from '@shared/pipes/yes-no.pipe';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { HttpService } from '@core/services/http.service';
import { GridDataFactoryService } from '@core/modules/grid/services/grid-data-factory.service';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';

import { RoadmapResponse } from '../models/roadmap-response';
import { RoadmapTable } from '../models/roadmap-table.model';

@Injectable()
export class RoapmapService extends GridDataFactoryService {

  constructor(httpService: HttpService) {
    super(httpService);
  }

  get(): Observable<GridConfig<RoadmapResponse>> {
    return this.create<RoadmapResponse, RoadmapTable>('roadmaps', this.createColumnHeaders());
  }

  private createColumnHeaders(): RoadmapTable {
    return {
      id: {
        friendlyName: 'Id',
        filterType: FilterTypes.String,
        appliedFilters: [],
        hideProperty: true
      } as HeaderItem,
      name: {
        friendlyName: 'Name',
        filterType: FilterTypes.String,
        appliedFilters: [],
        hideProperty: false,
        width: 150
      } as HeaderItem,
      description: {
        friendlyName: 'Description',
        filterType: FilterTypes.String,
        appliedFilters: [],
        hideProperty: false,
      } as HeaderItem,
      isStarted: {
        friendlyName: 'Is Started',
        filterType: FilterTypes.MultiSelect,
        appliedFilters: [],
        hideProperty: false,
        shouldHideAtPixels: 820,
        pipe: new YesNoPipe(),
        width: 60
      } as HeaderItem,
      percentageCompleted: {
        friendlyName: 'Progress',
        filterType: FilterTypes.NumberRange,
        appliedFilters: [],
        hideProperty: false,
        shouldHideAtPixels: 750,
        width: 100
      } as HeaderItem,
      order: {
        friendlyName: '',
        filterType: FilterTypes.String,
        appliedFilters: [],
        hideProperty: true
      } as HeaderItem,
    } as RoadmapTable;
  }
}
