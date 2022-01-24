import { BaseStepEvent } from '@core/modules/elements/stepper/models/step.model';
import { nameof } from 'ts-simple-nameof';
import { AssignGamesComponent } from '../add/assign-games/assign-games.component';
import { AssignedGameRequest } from './assigned-game-request.model';

export class AssignedGamesEvent extends BaseStepEvent {
    assignedGames: AssignedGameRequest[];
    constructor(games: AssignedGameRequest[]) {
        super();
        this.assignedGames = games;
        this.componentName = nameof(AssignGamesComponent);
    }
}
