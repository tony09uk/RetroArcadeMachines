import { Address } from './address.model';
import { AssignedGame } from './game.model';
import { MoreInformation } from './more-information.model';

export interface StepData {
    address: Address;
    assignedGamesList: AssignedGame[];
    additionalInformation: MoreInformation;
}
