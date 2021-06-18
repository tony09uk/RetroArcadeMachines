import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from '@core/services/http.service';
import { GameOverview } from '../models/game-overview.model';

@Injectable()
export class GamesService {

    constructor(private _httpService: HttpService) { }

    get(): Observable<GameOverview[]> {
        return this._httpService
                .get<GameOverview[]>('games');
    }
}
