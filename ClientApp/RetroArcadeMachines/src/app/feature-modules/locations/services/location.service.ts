import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from '@core/services/http.service';
import { LocationOverview } from '../models/location-overview.model';

@Injectable()
export class LocationService {

    constructor(private _httpService: HttpService) { }

    get(): Observable<LocationOverview[]> {
        return this._httpService
                .get<LocationOverview[]>('locations');
    }
}
