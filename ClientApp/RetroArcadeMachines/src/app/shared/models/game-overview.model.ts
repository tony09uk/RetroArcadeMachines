export interface GameOverview {
    id: string;
    title: string;
    releaseYear: number;
    maxPlayers: number;
    developerList: string[];
    thumbnailUrl: string;
    genreList: string[]; // todo: make genreList clickable objects of type Genre
}
