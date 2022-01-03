import { Injectable } from '@angular/core';

import { HttpService } from '@core/services/http.service';

import { StepData } from '../models/step-data.model';

@Injectable()
export class AddService {
    stepData: StepData = { address: undefined, assignedGamesList: undefined, additionalInformation: undefined };

    constructor(private _httpService: HttpService) { }

}
