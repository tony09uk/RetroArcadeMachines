
import { Address as PlacesAddress } from 'ngx-google-places-autocomplete/objects/address';
import { AddressComponent } from 'ngx-google-places-autocomplete/objects/addressComponent';
import { OpeningHours, OpeningPeriod } from 'ngx-google-places-autocomplete/objects/openingHours';

import { Address } from '../models/address.model';
import { AssignedGameRequest } from '../models/assigned-game-request.model';
import { BusinessHours } from '../models/business-hours.model';
import { LocationDetailsRequestModel } from '../models/location-details-request.model';
import { MoreInformation } from '../models/more-information.model';

export class MapRequestService {
    mapRequest(placesAddress: PlacesAddress, assignedGames: AssignedGameRequest[], moreInfo: MoreInformation): LocationDetailsRequestModel {
        const address = this.mapAddress(placesAddress);

        return {
            name: placesAddress.name,
            isRetroGamesOnly: moreInfo.isRetroGamesOnly,
            entryPrice: moreInfo.entryFee,
            rating: placesAddress.rating,
            // isChildFriendly: moreInfo.isChildFriendly,
            // isFoodServed: moreInfo.isFoodServed,
            emailAddress: '',
            website: placesAddress.website,
            lat: placesAddress.geometry.location.lat(),
            lng: placesAddress.geometry.location.lng(),
            address: address,
            businessHoursList: this.mapBusinessHoursList(placesAddress.opening_hours),
            phoneNumberList: [placesAddress.formatted_phone_number],
            assignedGamesList: assignedGames,
            imageUrlList: []
        } as LocationDetailsRequestModel;
    }

    mapAddress(address: PlacesAddress): Address {
        // todo: only format postal code if uk or country that splits postal code
        const postCode = this.getFormattedPostalCode(address.address_components);

        return {
            id: address.place_id,
            lineOne: this.getAddressComponentValue(address.address_components, 'route'),
            lineTwo: this.getAddressComponentValue(address.address_components, 'administrative_area_level_2'),
            lineThree: undefined, // todo: what can be added here if anything?
            country: this.getAddressComponentValue(address.address_components, 'administrative_area_level_1'),
            postalcode1: postCode[0],
            postalcode2: postCode[1],
            town: this.getAddressComponentValue(address.address_components, 'postal_town')
        };
    }

    private getAddressComponentValue(addressComponents: AddressComponent[], type: string): string {
        const component = addressComponents.find(x => x.types.includes(type));
        if (!component) {
            return undefined;
        }
        return component.long_name;
    }

    private getFormattedPostalCode(addressComponents: AddressComponent[]): string[] {
        const postCode = this.getAddressComponentValue(addressComponents, 'postal_code');
        let postCode1: string;
        let postCode2: string;

        if (postCode) {
            const postCodeParts = postCode.split(' ');
            postCode1 = postCodeParts[0];
            postCode2 = postCodeParts.length > 0 ? postCodeParts[1] : undefined;
        }

        return [postCode1, postCode2];
    }

    private mapBusinessHoursList(openingHours: OpeningHours): BusinessHours[] {
        if (!openingHours) {
            return [];
        }

        const businessHours: BusinessHours[] = [];
        openingHours.periods
            .forEach((item: OpeningPeriod) => {
                businessHours.push({
                    dayOfTheWeek: item.open.day,
                    openingTime: item.open.time,
                    closingTime: item.close.time
                } as BusinessHours);
            });
        return businessHours;
    }
}
