import { BaseStepEvent } from '@core/modules/elements/stepper/models/step.model';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { nameof } from 'ts-simple-nameof';
import { FindLocationComponent } from '../add/find-location/find-location.component';

export class FindLocationEvent extends BaseStepEvent {
    address: Address;
    constructor(address: Address) {
        super();
        this.address = address;
        this.componentName = nameof(FindLocationComponent);
    }
}
