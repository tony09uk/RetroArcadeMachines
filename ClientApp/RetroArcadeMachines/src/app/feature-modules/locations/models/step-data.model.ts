import { Address } from './address.model';
import { AssignedGameRequest } from './assigned-game-request.model';
import { MoreInformation } from './more-information.model';

export interface StepData {
    address: Address;
    assignedGamesList: AssignedGameRequest[];
    additionalInformation: MoreInformation;
}
