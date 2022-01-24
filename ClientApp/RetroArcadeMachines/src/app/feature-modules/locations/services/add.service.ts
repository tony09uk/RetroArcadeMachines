import { Injectable } from '@angular/core';

import { HttpService } from '@core/services/http.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Observable, ReplaySubject } from 'rxjs';
import { AssignedGameRequest } from '../models/assigned-game-request.model';
import { MoreInformation } from '../models/more-information.model';

import { StepData } from '../models/step-data.model';
import { Address as Addr } from '../models/address.model';
import { AssignedGamesEvent } from '../models/assigned-games-event.model';
import { MoreInformationEvent } from '../models/more-information-event.model';
import { FindLocationEvent } from '../models/find-location-event.model';
import { MapRequestService } from './map-request.service';
import { KeyValue } from '@angular/common';

@Injectable()
export class AddService {
    private _stepData: StepData = { address: undefined, assignedGamesList: undefined, additionalInformation: undefined };
    private _stepData$: ReplaySubject<StepData> = new ReplaySubject<StepData>(1);

    constructor(
        private _httpService: HttpService,
        private _mapRequestService: MapRequestService) { }

    saveLocation(address: Address, assignedGames: AssignedGameRequest[], moreInfo: MoreInformation): Observable<boolean> {
        const request = this._mapRequestService.mapRequest(address, assignedGames, moreInfo);
        return this._httpService.post('addlocation', request);
    }

    watchStepData(): Observable<StepData> {
        return this._stepData$;
    }

    updateStepData(value: FindLocationEvent | AssignedGamesEvent | MoreInformationEvent): void {

        if (value instanceof FindLocationEvent) {
            this._stepData.address = this._mapRequestService.mapAddress(value.address);
        }

        if (value instanceof AssignedGamesEvent) {
            this._stepData.assignedGamesList = value.assignedGames;
        }

        if (value instanceof MoreInformationEvent) {
            this._stepData.additionalInformation = value.moreInformation;
        }

        this._stepData$.next(this._stepData);
    }
}
