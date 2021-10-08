import { GameOverview } from '../../../shared/models/game-overview.model';

export interface GameDetails extends GameOverview {
    imageListUrls: string[];
    videoClipListUrl: string;
    rating: number;
    description: string;
}
