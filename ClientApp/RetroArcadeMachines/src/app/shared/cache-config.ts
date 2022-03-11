import { DBConfig, ObjectStoreMeta, ObjectStoreSchema } from 'ngx-indexed-db';
import { nameof } from 'ts-simple-nameof';

import { GameOverview } from './models/game-overview.model';
import { LastModified } from './models/last-modified.model';
import { LocationOverview } from './models/location-overview.model';
import { RoadmapResponse } from './models/roadmap-response';

export class CacheConfig {
    static schema: DBConfig = {
        name: 'CanIRetroDb',
        version: 1,
        objectStoresMeta: [{
            store: nameof(LocationOverview),
            storeConfig: { keyPath: 'id', autoIncrement: false },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'isRetroGamesOnly', keypath: 'isRetroGamesOnly', options: { unique: false } },
                { name: 'entryPrice', keypath: 'entryPrice', options: { unique: false } },
                { name: 'rating', keypath: 'rating', options: { unique: false } },
                { name: 'town', keypath: 'town', options: { unique: false } },
                { name: 'isChildFriendly', keypath: 'isChildFriendly', options: { unique: false } },
                { name: 'isFoodServed', keypath: 'isFoodServed', options: { unique: false } },
            ]
        } as ObjectStoreMeta,
        {
            store: nameof(GameOverview),
            storeConfig: { keyPath: 'id', autoIncrement: false },
            storeSchema: [
                { name: 'title', keypath: 'title', options: { unique: false } },
                { name: 'releaseYear', keypath: 'releaseYear', options: { unique: false } },
                { name: 'maxPlayers', keypath: 'maxPlayers', options: { unique: false } },
                { name: 'developerList', keypath: 'developerList', options: { unique: false } },
                { name: 'thumbnailUrl', keypath: 'thumbnailUrl', options: { unique: false } },
                { name: 'genreList', keypath: 'genreList', options: { unique: false } }
            ]
        } as ObjectStoreMeta,
        {
            store: nameof(RoadmapResponse),
            storeConfig: { keyPath: 'id', autoIncrement: false },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'description', keypath: 'description', options: { unique: false } },
                { name: 'isStarted', keypath: 'isStarted', options: { unique: false } },
                { name: 'percentageCompleted', keypath: 'percentageCompleted', options: { unique: false } },
                { name: 'order', keypath: 'order', options: { unique: false } },
            ]
        } as ObjectStoreMeta,
        {
            store: nameof(LastModified),
            storeConfig: { keyPath: 'name', autoIncrement: false },
            storeSchema: [
                { name: 'name', keypath: 'name', options: { unique: false } },
                { name: 'date', keypath: 'date', options: { unique: false } },
            ]
        } as ObjectStoreMeta ]
    };

    private static createStoreSchema<T>(type: T): ObjectStoreSchema[] {
        const schema: ObjectStoreSchema[] = [];
        Object.keys(type).forEach(element => {
            schema.push({name: element, keypath: element, options: { unique: false } });
        });
        return schema;
    }
}
