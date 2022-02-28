import { Injectable } from '@angular/core';

import { nameof } from 'ts-simple-nameof';
import { Observable } from 'rxjs';

import { HttpService } from '@core/services/http.service';
import { GameOverview } from 'src/app/shared/models/game-overview.model';

@Injectable()
export class AssignGamesService {
    constructor(private _httpService: HttpService) { }

    getAllGames(): Observable<GameOverview[]> {
        return this._httpService.get('games', nameof(GameOverview));
    }
}
