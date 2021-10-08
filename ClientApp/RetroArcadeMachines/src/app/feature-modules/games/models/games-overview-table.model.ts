import { HeaderItem } from '@core/modules/grid/models/header-item';

export class GamesOverviewTable {
    id: HeaderItem;
    title: HeaderItem;
    releaseYear: HeaderItem;
    maxPlayers: HeaderItem;
    developerList?: HeaderItem;
    thumbnailUrl: HeaderItem;
    genreList?: HeaderItem;
}
