import { Component, OnInit } from '@angular/core';
import { ListItem } from '@core/modules/elements/list/models/list-item.model';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';
import { AssignedGame } from '../../models/game.model';
import { StepLabelConstants } from '../../models/step-label-constants.model';
import { AddService } from '../../services/add.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent extends StepBaseComponent<any> implements OnInit {

  addressTitle = StepLabelConstants.findLocation;
  gamesTitle = StepLabelConstants.assignGames;
  moreInfo = StepLabelConstants.moreInfo;

  addressList: ListItem[] = [];
  gamesList: ListItem[] = [];
  moreInfoList: ListItem[] = [];

  constructor(private _addService: AddService) {
    super();
  }

  ngOnInit(): void {
    this.addressListItems();
    this.gamesListItems();
    this.moreInfoListItems();
  }

  private addressListItems(): void {
    this.addressList.push({ value: this._addService.stepData.address.lineOne } as ListItem);
  }

  private gamesListItems(): void {
    this._addService
      .stepData
      .assignedGamesList
      .forEach((game: AssignedGame) => {
        this.gamesList.push({ value: game.title } as ListItem);
      });
  }

  private moreInfoListItems(): void {
    this.moreInfoList.push({ value: this._addService.stepData.additionalInformation.entryFee.toString() } as ListItem);
  }
}
