import { Injectable } from '@angular/core';

import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';
import { GameOverview } from 'src/app/shared/models/game-overview.model';

@Injectable()
export class AssignGamesService {
    constructor(private _httpService: HttpService) { }

    getAllGames(): Observable<GameOverview[]> {
        return this._httpService.get('games');
    }
}
