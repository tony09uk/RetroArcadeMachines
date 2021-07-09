import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/internal/operators/take';

import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { HttpService } from '@core/services/http.service';

import { RoadmapResponse } from '../models/roadmap-response';
import { RoadmapTable } from '../models/roadmap-table.model';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';

@Injectable()
export class RoapmapService {

  constructor(private _httpService: HttpService) { }

  get(): Observable<GridConfig<RoadmapResponse>> {
    return this._httpService
      .get<RoadmapResponse[]>('roadmaps')
      .pipe(
        take(1),
        map((value: RoadmapResponse[]) => this.createGridConfig(this, value))
      );
  }

  private createGridConfig(self: RoapmapService, data: RoadmapResponse[]): GridConfig<RoadmapResponse> {
    const gridConfig = new GridConfig<RoadmapResponse>();
    gridConfig.tableData = data;

    gridConfig.columnHeader = self.createColumnHeaders();

    return gridConfig;
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
        hideProperty: false
      } as HeaderItem,
      description: {
        friendlyName: 'Description',
        filterType: FilterTypes.String,
        appliedFilters: [],
        hideProperty: false
      } as HeaderItem,
      isStarted: {
        friendlyName: 'Is Started',
        filterType: FilterTypes.MultiSelect,
        appliedFilters: [],
        hideProperty: false,
        shouldHideAtPixels: 820
      } as HeaderItem,
      percentageCompleted: {
        friendlyName: 'Progress',
        filterType: FilterTypes.NumberRange,
        appliedFilters: [],
        hideProperty: false,
        shouldHideAtPixels: 750
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
