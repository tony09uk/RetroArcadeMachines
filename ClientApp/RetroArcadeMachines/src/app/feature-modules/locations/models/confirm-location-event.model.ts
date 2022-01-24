import { BaseStepEvent } from '@core/modules/elements/stepper/models/step.model';
import { nameof } from 'ts-simple-nameof';
import { ConfirmComponent } from '../add/confirm/confirm.component';

export class ConfirmLocationEvent extends BaseStepEvent {
    constructor() {
        super();
        this.componentName = nameof(ConfirmComponent);
    }
}
