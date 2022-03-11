import { TestBed } from '@angular/core/testing';
import { CellContentTypes } from '@core/modules/grid/enums/cell-content-types.enum';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';

import { HttpService } from '@core/services/http.service';
import { GameOverview } from '@shared/models/game-overview.model';
import { of } from 'rxjs';

import { GamesService } from './games.service';

describe('GamesService', () => {
    let httpServiceSpyObj: jasmine.SpyObj<HttpService>;
    let sut: GamesService;

    const GAMEOVERVIEWDATA = [{
        id: '1',
        developerList: ['test'],
        genreList: ['test'],
        maxPlayers: 1,
        releaseYear: 1980,
        thumbnailUrl: 'any',
        title: 'test'
    }] as GameOverview[];

    beforeEach(() => {
        httpServiceSpyObj = jasmine.createSpyObj<HttpService>('HttpService', [
            'get'
        ]);
        httpServiceSpyObj.get.and.returnValue(of(GAMEOVERVIEWDATA));

        TestBed.configureTestingModule({
            providers: [
                GamesService,
                { provide: HttpService, useValue: httpServiceSpyObj }
            ]
        });

        sut = TestBed.inject(GamesService);
    });

    it('should create', () => {
        expect(sut).toBeTruthy();
    });

    it('should create games table data', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.tableData).toEqual(GAMEOVERVIEWDATA);
                }
            );
    });

    it('should get Id table header', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.columnHeader.id.friendlyName).toEqual('Id');
                    expect(actual.columnHeader.id.filterType).toEqual(FilterTypes.String);
                    expect(actual.columnHeader.id.appliedFilters).toEqual([]);
                    expect(actual.columnHeader.id.hideProperty).toEqual(true);
                }
            );
    });

    it('should get thumbnailUrl table header', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.columnHeader.thumbnailUrl.friendlyName).toEqual('');
                    expect(actual.columnHeader.thumbnailUrl.filterType).toEqual(FilterTypes.None);
                    expect(actual.columnHeader.thumbnailUrl.cellContentType).toEqual(CellContentTypes.Image);
                    expect(actual.columnHeader.thumbnailUrl.appliedFilters).toEqual([]);
                    expect(actual.columnHeader.thumbnailUrl.hideProperty).toEqual(false);
                }
            );
    });

    it('should get title table header', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.columnHeader.title.friendlyName).toEqual('Title');
                    expect(actual.columnHeader.title.filterType).toEqual(FilterTypes.String);
                    expect(actual.columnHeader.title.appliedFilters).toEqual([]);
                    expect(actual.columnHeader.title.hideProperty).toEqual(false);
                }
            );
    });

    it('should get releaseYear table header', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.columnHeader.releaseYear.friendlyName).toEqual('Release Year');
                    expect(actual.columnHeader.releaseYear.filterType).toEqual(FilterTypes.NumberRange);
                    expect(actual.columnHeader.releaseYear.appliedFilters).toEqual([]);
                    expect(actual.columnHeader.releaseYear.hideProperty).toEqual(false);
                }
            );
    });

    it('should get maxPlayers table header', () => {
        sut.get()
            .subscribe(
                (actual: GridConfig<GameOverview>) => {
                    expect(actual.columnHeader.maxPlayers.friendlyName).toEqual('Max Players');
                    expect(actual.columnHeader.maxPlayers.filterType).toEqual(FilterTypes.String);
                    expect(actual.columnHeader.maxPlayers.appliedFilters).toEqual([]);
                    expect(actual.columnHeader.maxPlayers.hideProperty).toEqual(false);
                }
            );
    });
});
