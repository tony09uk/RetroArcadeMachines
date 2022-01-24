import { BaseStepEvent } from '@core/modules/elements/stepper/models/step.model';
import { nameof } from 'ts-simple-nameof';
import { MoreInformationComponent } from '../add/more-information/more-information.component';
import { MoreInformation } from './more-information.model';

export class MoreInformationEvent extends BaseStepEvent {
    moreInformation: MoreInformation;
    constructor(moreinfo: MoreInformation) {
        super();
        this.moreInformation = moreinfo;
        this.componentName = nameof(MoreInformationComponent);
    }
}
