import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { GameOverview } from 'src/app/shared/models/game-overview.model';
import { Address } from './address.model';
import { BusinessHours } from './business-hours.model';
import { LocationOverview } from './location-overview.model';

export interface LocationDetails extends LocationOverview {
    synopsis: string;
    emailAddress: string;
    website: string;
    lat: string;
    lng: string;
    address: Address;
    phoneNumberList: string[];
    businessHoursList: BusinessHours[];
    gameOverviewList: GameOverview[];
    imageUrlList: string[];
    gameCollectionTable: GridConfig<GameOverview>;
}
