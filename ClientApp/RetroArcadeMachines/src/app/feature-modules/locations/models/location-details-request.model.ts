import { Address } from './address.model';
import { AssignedGameRequest } from './assigned-game-request.model';
import { BusinessHours } from './business-hours.model';

export interface LocationDetailsRequestModel {
    name: string;
    isRetroGamesOnly: boolean;
    entryPrice: number | null;
    rating: number;
    isChildFriendly: boolean;
    isFoodServed: boolean;
    emailAddress: string;
    website: string;
    lat: number;
    lng: number;
    address: Address;
    phoneNumberList: string[];
    businessHoursList: BusinessHours[];
    assignedGamesList: AssignedGameRequest[];
    imageUrlList: string[];
}
