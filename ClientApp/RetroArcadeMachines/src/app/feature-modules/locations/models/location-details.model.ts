import { Address } from './address.model';
import { LocationOverview } from './location-overview.model';
import { OpeningHours } from './opening-hours.model';

export interface LocationDetails extends LocationOverview {
    address: Address;
    openingHours: OpeningHours;
    phoneNumbers: string;
    websiteAddress: string;
}
