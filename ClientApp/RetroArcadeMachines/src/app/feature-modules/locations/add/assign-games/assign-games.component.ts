import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { AutocompleteOption } from '@core/modules/form/autocomplete/models/autocomplete-option.model';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';
import { GameOverview } from 'src/app/shared/models/game-overview.model';

import { AssignGamesService } from '../../services/assign-games.service';
import { AssignedGameRequest } from '../../models/assigned-game-request.model';
import { ListItem } from '@core/modules/elements/list/models/list-item.model';
import { AssignedGamesEvent } from '../../models/assigned-games-event.model';
import { StepErrorEvent } from '@core/modules/elements/stepper/models/step-error.event';
import { nameof } from 'ts-simple-nameof';
import { StepErrors } from '../../models/step-errors.enum';

@Component({
  selector: 'app-assign-games',
  templateUrl: './assign-games.component.html',
  styleUrls: ['./assign-games.component.scss'],
  providers: [ AssignGamesService ]
})
export class AssignGamesComponent extends StepBaseComponent<AssignedGamesEvent> implements OnInit {

  gameOptions: AutocompleteOption[] = [];
  selectedGames: ListItem[] = [];

  private _gamesOverviewList: GameOverview[] = [];

  constructor(private _assignGamesService: AssignGamesService) {
    super();
  }

  ngOnInit(): void {
    this._assignGamesService
      .getAllGames()
      .pipe(
        take(1)
      ).subscribe(
        (response: GameOverview[]) => { this.updateAutocomplete(response); },
        (error: HttpErrorResponse) => { this.handleError(error); }
      );
  }

  selectedOption(selectedItem: AutocompleteOption): void {
    const gameInList = this.selectedGames.find(x => x.id === selectedItem.id);
    if (gameInList) {
      return;
    }

    this.selectedGames.push({
      id: selectedItem.id,
      value: selectedItem.value,
      allowDelete: true,
      icon: 'folder' // todo: change this to be the games thumbnail
    } as ListItem);

    this.emitSelectedItemChanged();
  }

  listItemRemoved(item: ListItem): void {
    this.emitSelectedItemChanged();
  }

  private updateAutocomplete(options: GameOverview[]): void {
    this._gamesOverviewList = options;
    this.gameOptions = options.map(x => ({ id: x.id, value: x.title }));
  }

  private emitSelectedItemChanged(): void {
    const assignedGames: AssignedGameRequest[] = [];
    this.selectedGames.forEach((game: ListItem) => {
      const gameOverview = this._gamesOverviewList.find(x => x.id === game.id);

      if (gameOverview) {
        assignedGames.push({id: gameOverview.id, releaseYear: gameOverview.releaseYear, title: gameOverview.title});
      }
    });

    this.events.emit(new AssignedGamesEvent(assignedGames));
  }

  private handleError(error: HttpErrorResponse): void {
    this.emitError<StepErrors>(nameof(AssignGamesComponent), StepErrors.GetGamesListFailed);
  }
}
