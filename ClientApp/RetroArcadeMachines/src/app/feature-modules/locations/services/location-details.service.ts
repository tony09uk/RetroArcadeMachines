import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CellContentTypes } from '@core/modules/grid/enums/cell-content-types.enum';
import { FilterTypes } from '@core/modules/grid/enums/filter-types.enum';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { HeaderItem } from '@core/modules/grid/models/header-item';
import { GridDataFactoryService } from '@core/modules/grid/services/grid-data-factory.service';
import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { GameOverview } from 'src/app/shared/models/game-overview.model';
import { Address } from '../models/address.model';
import { DaysOfTheWeek } from '../models/days-of-the-week.enum';
import { GamesCollectionTable } from '../models/games-collection-table.model';
import { LocationDetails } from '../models/location-details.model';
import { PhoneNumber } from '../models/phone-number.model';

@Injectable()
export class LocationDetailsService extends GridDataFactoryService {

    constructor(httpService: HttpService) {
        super(httpService);
    }

    get(id: string): Observable<LocationDetails> {
        let params = new HttpParams().set('id', id);

        //get obs LocationDetails
        //add GridConfig<GameOverview>
        //rtn LocationDetails

        return this._httpService
            .get<LocationDetails>('LocationDetails', params)
            .pipe(
                take(1),
                mergeMap((response: LocationDetails) => this.getGamesCollectionTable(response)),
            );

        const details = {
            id: '1', // todo: change to number
            name: 'Game Club', //
            isRetroGamesOnly: true,
            entryPrice: 5.99, //
            rating: 4, //
            town: 'Leeds', //
            isChildFriendly: true,
            isFoodServed: true,
            address: { //
                lineOne: 'Unit 3, Abbey Retail Park',
                lineTwo: 'Savins Mill Way',
                lineThree: 'Kirkstall',
                town: 'Leeds',
                postcode1: 'LS5',
                postcode2: '3RP'
            } as Address,
            lat: '53.8155546',
            lng: '-1.6034085',
            phoneNumberList: [ //
                { stdCode: '01482', number: '212380' } as PhoneNumber
            ],
            businessHoursList: [ //
                { dayOfTheWeek: DaysOfTheWeek.Monday, openingTime: null, closingTime: null },
                { dayOfTheWeek: DaysOfTheWeek.Tuesday, openingTime: null, closingTime: null },
                { dayOfTheWeek: DaysOfTheWeek.Wednesday, openingTime: null, closingTime: null },
                { dayOfTheWeek: DaysOfTheWeek.Thursday, openingTime: '16:00', closingTime: '23:00' },
                { dayOfTheWeek: DaysOfTheWeek.Friday, openingTime: '18:00', closingTime: '00:00' },
                { dayOfTheWeek: DaysOfTheWeek.Saturday, openingTime: '11:00', closingTime: '23:00' },
                { dayOfTheWeek: DaysOfTheWeek.Sunday, openingTime: '11:00', closingTime: '20:00' }
            ],
            gameOverviewList: [
                { id: 1, title: 'Time Crisis' } as GameOverview,
                { id: 2, title: 'Afterburner' } as GameOverview,
                { id: 3, title: 'Crazy Taxi' } as GameOverview,
                { id: 4, title: 'Outrun' } as GameOverview,
            ],
            imageUrlList: ['https://via.placeholder.com/1142x440'], //
            synopsis: 'This is where information on the location would be added. It can be long or short and is added by the user',
            emailAddress: 'info@.arcadeclub.co.uk', //
            website: 'https://www.arcadeclub.co.uk/leeds' //
        } as LocationDetails;
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
