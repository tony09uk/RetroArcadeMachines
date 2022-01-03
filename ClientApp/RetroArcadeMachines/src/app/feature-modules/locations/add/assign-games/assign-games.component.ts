import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { take } from 'rxjs/operators';

import { AutocompleteOption } from '@core/modules/form/autocomplete/models/autocomplete-option.model';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';
import { GameOverview } from 'src/app/shared/models/game-overview.model';

import { AssignGamesService } from '../../services/assign-games.service';
import { AssignedGame } from '../../models/game.model';
import { ListItem } from '@core/modules/elements/list/models/list-item.model';

@Component({
  selector: 'app-assign-games',
  templateUrl: './assign-games.component.html',
  styleUrls: ['./assign-games.component.scss'],
  providers: [ AssignGamesService ]
})
export class AssignGamesComponent extends StepBaseComponent<AssignedGame[]> implements OnInit {

  gameOptions: AutocompleteOption[] = [];
  selectedGames: ListItem[] = [];

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
        (error: HttpErrorResponse) => { }
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

    const assignedGames = this.selectedGames
                            .map(x => ({
                              id: x.id,
                              title: x.value
                            } as AssignedGame));

    this.events.emit(assignedGames);
  }

  listItemRemoved(item: ListItem): void {

  }

  private updateAutocomplete(options: GameOverview[]): void {
    this.gameOptions = options.map(x => ({ id: x.id.toString(), value: x.title }));
  }
}
