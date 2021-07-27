import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs/operators';

import { GridConfig } from '@core/modules/grid/models/grid-config.model';

import { GamesService } from '../services/games.service';
import { GameOverview } from '../models/game-overview.model';

@Component({
  selector: 'app-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.scss'],
  providers: [ GamesService ]
})
export class GamesOverviewComponent implements OnInit {

  table: GridConfig<GameOverview>;

  constructor(private _gamesService: GamesService) { }

  ngOnInit(): void {
    this._gamesService
      .get()
      .pipe(
        take(1),
      ).subscribe(
        (response: GridConfig<GameOverview>) => { this.table = response; },
        (error: HttpErrorResponse) => { console.log(error); }
      );
  }
}
