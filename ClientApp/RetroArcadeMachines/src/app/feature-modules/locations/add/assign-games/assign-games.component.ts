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
import { AbstractControl, FormGroup } from '@angular/forms';
import { AssignGamesFormService } from './assign-games-form.service';

@Component({
  selector: 'app-assign-games',
  templateUrl: './assign-games.component.html',
  styleUrls: ['./assign-games.component.scss'],
  providers: [ AssignGamesService, AssignGamesFormService ]
})
export class AssignGamesComponent extends StepBaseComponent<AssignedGamesEvent> implements OnInit {

  gameOptions: AutocompleteOption[] = [];
  selectedGames: ListItem[] = [];
  showManualAddInputs: boolean = false;
  manualGameInputForm: FormGroup;
  selectedGamesMessage: string = 'Location Games';

  title: AbstractControl;
  category: AbstractControl;

  private _gamesOverviewList: GameOverview[] = [];

  constructor(
    private _assignGamesService: AssignGamesService,
    private _assignGamesFormService: AssignGamesFormService) {
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

  selectedOption(selectedItem: AutocompleteOption, isGameUnlisted: boolean = false): void {
    if (!isGameUnlisted) {
      const gameInList = this.selectedGames.find(x => x.id === selectedItem.id);
      if (gameInList) {
        return;
      }
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

  hintClicked(): void {
    this.showManualAddInputs = true;
    this.manualGameInputForm = this._assignGamesFormService.get();
  }

  addUnlistedGame(): void {
    const category = this.manualGameInputForm.value.category;
    const title = this.manualGameInputForm.value.title;

    // todo: this must be added as proper form validation - currently no error is displayed
    if (!category || !title) {
      return;
    }

    const item = {
      id: '00000000-0000-0000-0000-000000000000',
      value: `${category}:- ${title}`
    } as AutocompleteOption;

    this.selectedOption(item, true);
    this.manualGameInputForm.reset();
    this.selectedGamesMessage += ' (Manually added games need to be approved by a moderator before showing)';
  }

  private updateAutocomplete(options: GameOverview[]): void {
    this._gamesOverviewList = options;
    this.gameOptions = options.map(x => ({ id: x.id, value: x.title }));
  }

  private emitSelectedItemChanged(): void {
    const assignedGames: AssignedGameRequest[] = [];

    this.selectedGames.forEach((game: ListItem) => {
      const assignedGameRequest = {} as AssignedGameRequest;
      const gameOverview = this._gamesOverviewList.find(x => x.id === game.id);

      if (gameOverview) {
        assignedGameRequest.id = gameOverview.id;
        assignedGameRequest.releaseYear = gameOverview.releaseYear;
        assignedGameRequest.title = gameOverview.title;
      } else {
        assignedGameRequest.id = game.id;
        assignedGameRequest.title = game.value;
      }

      assignedGames.push(assignedGameRequest);
    });

    this.events.emit(new AssignedGamesEvent(assignedGames));
  }

  private handleError(error: HttpErrorResponse): void {
    this.emitError<StepErrors>(nameof(AssignGamesComponent), StepErrors.GetGamesListFailed);
  }
}
