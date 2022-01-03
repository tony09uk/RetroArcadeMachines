import { Component, OnInit, ViewChild } from '@angular/core';
import { Step } from '@core/modules/elements/stepper/models/step.model';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AssignedGame } from '../models/game.model';
import { MoreInformation } from '../models/more-information.model';
import { Address as Addr } from '../models/address.model';
import { AddService } from '../services/add.service';
import { AssignGamesComponent } from './assign-games/assign-games.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FindLocationComponent } from './find-location/find-location.component';
import { MoreInformationComponent } from './more-information/more-information.component';
import { StepLabelConstants } from '../models/step-label-constants.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AddService]
})
export class AddComponent implements OnInit {

  steps: Step[] = [
    {
      buttonLocation: 'aboveAndBelow',
      component: FindLocationComponent,
      allowForwardStep: true,
      allowBackStep: false,
      label: StepLabelConstants.findLocation,
      optional: false
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: AssignGamesComponent,
      allowForwardStep: true,
      allowBackStep: true,
      label: StepLabelConstants.assignGames,
      optional: false
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: MoreInformationComponent,
      allowForwardStep: true,
      allowBackStep: true,
      label: StepLabelConstants.moreInfo,
      optional: true
    },
    {
      buttonLocation: 'aboveAndBelow',
      component: ConfirmComponent,
      allowForwardStep: false,
      allowBackStep: true,
      label: StepLabelConstants.confirm,
      optional: false
    },
  ];

  constructor(private _addService: AddService) { }

  ngOnInit(): void {

  }

  handleEvent(event: Address | AssignedGame[] | MoreInformation): void {
    console.log(event);

    if ('place_id' in event) {
      this._addService.stepData.address = this.mapAddress(event);
    }

    if (Array.isArray(event) && 'title' in event[0]) {
      this._addService.stepData.assignedGamesList = event;
    }

    if ('entryFee' in event) {
      this._addService.stepData.additionalInformation = event;
    }
  }

  private mapAddress(address: Address): Addr {
    return {
      id: 'jsnjfdnkjls',
      lineOne: 'line1',
      lineTwo: 'line2',
      lineThree: 'line3',
      postcode1: 'NG10',
      postcode2: '5HG',
      town: 'Notts'
    };
  }
}
