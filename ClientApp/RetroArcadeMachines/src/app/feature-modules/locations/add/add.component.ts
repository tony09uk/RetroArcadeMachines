import { Component } from '@angular/core';

import { nameof } from 'ts-simple-nameof';
import { finalize, take } from 'rxjs/operators';

import { Step } from '@core/modules/elements/stepper/models/step.model';
import { AlertService } from '@core/services/alert.service';
import { StepErrorEvent } from '@core/modules/elements/stepper/models/step-error.event';

import { AddService } from '../services/add.service';
import { AssignGamesComponent } from './assign-games/assign-games.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FindLocationComponent } from './find-location/find-location.component';
import { MoreInformationComponent } from './more-information/more-information.component';
import { StepLabelConstants } from '../models/step-label-constants.model';
import { AssignedGamesEvent } from '../models/assigned-games-event.model';
import { MoreInformationEvent } from '../models/more-information-event.model';
import { FindLocationEvent } from '../models/find-location-event.model';
import { ConfirmLocationEvent } from '../models/confirm-location-event.model';
import { StepErrors } from '../models/step-errors.enum';
import { MoreInformation } from '../models/more-information.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AddService]
})
export class AddComponent {

  showThankyouMessage: boolean = false;
  isSaving: boolean = false;
  steps: Step[] = [
    {
      buttonLocation: 'aboveAndBelow',
      component: FindLocationComponent,
      allowForwardStep: true,
      allowBackStep: false,
      label: StepLabelConstants.findLocation,
      optional: false,
      event: undefined
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: AssignGamesComponent,
      allowForwardStep: true,
      allowBackStep: true,
      label: StepLabelConstants.assignGames,
      optional: false,
      event: undefined
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: MoreInformationComponent,
      allowForwardStep: true,
      allowBackStep: true,
      label: StepLabelConstants.moreInfo,
      optional: true,
      event: undefined
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: ConfirmComponent,
      allowForwardStep: false,
      allowBackStep: true,
      label: StepLabelConstants.confirm,
      optional: false,
      event: undefined
    },
  ];

  constructor(
    private _addService: AddService,
    private _alertService: AlertService) { }

  handleEvent(event: FindLocationEvent | AssignedGamesEvent | MoreInformationEvent | ConfirmLocationEvent | StepErrorEvent<StepErrors>): void {
    if (event instanceof StepErrorEvent) {
      this.handleStepError(event);
      return;
    }

    this.updateStepEvent(event);

    if (event instanceof ConfirmLocationEvent) {
      this.saveLocation();
      return;
    }

    this._addService.updateStepData(event);
  }

  private updateStepEvent(event: FindLocationEvent | AssignedGamesEvent | MoreInformationEvent | ConfirmLocationEvent): void {
    if (event instanceof ConfirmLocationEvent) {
      return;
    }

    const step = this.steps.find(x => nameof(x.component) === event.componentName);

    if (!step) {
      throw Error('The event has no associated component');
    }
    step.event = event;
  }

  private saveLocation(): void {
    console.log(nameof(FindLocationComponent));
    console.log(this.steps);
    const addressEvent = this.steps
      .find(x => x.event.componentName === nameof(FindLocationComponent))
      .event as FindLocationEvent;

    const assignedGamesEvent = this.steps
      .find(x => x.event.componentName === nameof(AssignGamesComponent))
      .event as AssignedGamesEvent;

    const moreInfoEvent = this.steps
      .find(x => x.event.componentName === nameof(MoreInformationComponent))
      .event as MoreInformationEvent;

    this.isSaving = true;
    this._addService
      .saveLocation(addressEvent.address, assignedGamesEvent.assignedGames, moreInfoEvent.moreInformation)
      .pipe(
        take(1),
        finalize(() => this.isSaving = false)
      ).subscribe(
        response => { this.showThankyouMessage = true; },
        error => { this._alertService.error('there was an unexpected error! Please try again.'); }
      );
  }

  private handleStepError(step: StepErrorEvent<StepErrors>): void {
    // todo: currently only one type of error
    this._alertService.error(
      'There was an error which will stop you from adding a location, please refresh the page',
      'top',
      'center',
      600000);
  }
}
