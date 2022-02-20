import { Component, OnInit } from '@angular/core';

import { ListItem } from '@core/modules/elements/list/models/list-item.model';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';

import { AssignedGameRequest } from '../../models/assigned-game-request.model';
import { StepData } from '../../models/step-data.model';
import { StepLabelConstants } from '../../models/step-label-constants.model';
import { AddService } from '../../services/add.service';
import { Address } from '../../models/address.model';
import { MoreInformation } from '../../models/more-information.model';
import { take } from 'rxjs/operators';
import { ConfirmLocationEvent } from '../../models/confirm-location-event.model';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends StepBaseComponent<ConfirmLocationEvent> implements OnInit {

  addressTitle = StepLabelConstants.findLocation;
  gamesTitle = StepLabelConstants.assignGames;
  moreInfo = StepLabelConstants.moreInfo;

  addressList: ListItem[] = [];
  gamesList: ListItem[] = [];
  moreInfoList: ListItem[] = [];

  message: string;
  disableSubmit: boolean = true;

  private _submitMessage = 'Please check your selections then press confirm';

  constructor(private _addService: AddService) {
    super();
  }

  ngOnInit(): void {
    this.updateMessage();
    this._addService
      .watchStepData()
      .subscribe((stepData: StepData) => {
        this.addressListItems(stepData.address);
        this.gamesListItems(stepData.assignedGamesList);
        this.moreInfoListItems(stepData.additionalInformation);
        this.updateCanSubmit();
        this.updateMessage();
      });
  }

  saveLocation(): void {
    this.events.emit(new ConfirmLocationEvent());
  }

  private addressListItems(address: Address): void {
    this.addressList = [];

    if (!address) {
      return;
    }

    if (address.lineOne) {
      this.addressList.push({ value: address.lineOne } as ListItem);
    }

    if (address.lineTwo) {
      this.addressList.push({ value: address.lineTwo } as ListItem);
    }

    if (address.lineThree) {
      this.addressList.push({ value: address.lineThree } as ListItem);
    }

    if (address.town) {
      this.addressList.push({ value: address.town } as ListItem);
    }

    if (address.postalcode1 && address.postalcode2) {
      this.addressList.push({ value: `${address.postalcode1} ${address.postalcode2}` } as ListItem);
    }
  }

  private gamesListItems(assignedGamesList: AssignedGameRequest[]): void {
    this.gamesList = [];

    if (!assignedGamesList) {
      return;
    }
    assignedGamesList
      .forEach((game: AssignedGameRequest) => {
        this.gamesList.push({value: game.title } as ListItem);
      });
  }

  private moreInfoListItems(additionalInformation: MoreInformation): void {
    this.moreInfoList = [];

    if (!additionalInformation) {
      return;
    }

    if (additionalInformation.entryFee) {
      this.moreInfoList.push({ value: additionalInformation.entryFee.toString() } as ListItem);
    }
  }

  private updateCanSubmit(): void {
    if (this.isRequiredDataAdded()) {
      this.disableSubmit = false;
      return;
    }

    this.disableSubmit = true;
  }

  private isRequiredDataAdded(): boolean {
    return this.addressList &&
      this.addressList.length > 0 &&
      this.gamesList &&
      this.gamesList.length > 0;
  }

  private updateMessage(): void {
    const goBackMessage = 'Please go back to';
    if (!this.addressList || this.addressList.length < 1) {
      this.message = `${goBackMessage} ${this.addressTitle} and provide an address`;
      return;
    }

    if (!this.gamesList || this.gamesList.length < 1) {
      this.message = `${goBackMessage} ${this.gamesTitle} to add one or more games`;
      return;
    }

    this.message = this._submitMessage;
  }
}
