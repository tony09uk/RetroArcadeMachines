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
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AssignedGameRequest } from '../models/assigned-game-request.model';

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

  _address: Address;
  _assignedGames: AssignedGameRequest[];
  _moreInformation: MoreInformation;

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
    switch (true) {
      case event instanceof FindLocationEvent: {
        const findLocationEvent = event as FindLocationEvent;
        this._address = findLocationEvent.address;
        break;
      }
      case event instanceof AssignedGamesEvent: {
        const assignedGamesEvent = event as AssignedGamesEvent;
        this._assignedGames = assignedGamesEvent.assignedGames;
        break;
      }
      case event instanceof MoreInformationEvent: {
        const moreInformationEvent = event as MoreInformationEvent;
        this._moreInformation = moreInformationEvent.moreInformation;
        break;
      }
      case event instanceof ConfirmLocationEvent: {
        break;
      }
      default: {
        throw Error('The event has no associated component');
        break;
      }
    }
  }

  private saveLocation(): void {
    this.isSaving = true;
    this._addService
      .saveLocation(this._address, this._assignedGames, this._moreInformation)
      .pipe(
        take(1),
        finalize(() => this.isSaving = false)
      ).subscribe(
        response => { console.log(response); this.showThankyouMessage = true; },
        error => { console.log(error); this._alertService.error('there was an unexpected error! Please try again.'); }
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
