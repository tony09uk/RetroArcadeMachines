import { Injectable } from '@angular/core';

import { iif, Observable, of } from 'rxjs';
import { NgxIndexedDBService, WithID } from 'ngx-indexed-db';
import { nameof } from 'ts-simple-nameof';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { LastModified } from '@shared/models/last-modified.model';
import { HttpStatusCode } from '@angular/common/http';
import { CacheConfig } from 'src/app/shared/cache-config';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    constructor(
        private _dbService: NgxIndexedDBService,
        private _configService: ConfigService) { }

    get<T>(storeName: string, id: string): Observable<T> {
        console.log('get');
        return this._dbService.getByKey(storeName, id);
    }

    getAll<T>(storeName: string): Observable<T[]> {
        console.log('getAll');
        return this._dbService.getAll(storeName);
    }

    bulkGetOrInsert<T>(value: T, lastModDate: string, updateCode: number, storeName: string): Observable<any> {
        console.log('bulkGetOrInsert');
        return of(value);
        console.log('SHOULD NOT SEE THIS');

        if (!this.isObjectCacheable(storeName) || !this._configService.is_cache_enabled) {
            return of(value);
        }

        if (updateCode === HttpStatusCode.NoContent) {
            return this.getAll(storeName);
        }

        const lastModified = new LastModified(storeName, lastModDate);

        const updateLastModified$ = this.update(nameof(LastModified), lastModified);
        const addLastModified$ = this.add(nameof(LastModified), lastModified);

        return this._dbService.count(nameof(LastModified), lastModified.name)
            .pipe(
                mergeMap((val: number) => iif(() => val > 0, updateLastModified$, addLastModified$)),
                mergeMap(val => this.bulkAddAndReturnValues(storeName, value))
            );
    }

    updateByKey<T>(storeName: string, value: T, key: string): Observable<T> {
        console.log('updateByKey');
        return this._dbService.updateByKey(storeName, value, key);
    }

    update<T>(storeName: string, value: T): Observable<T[]> {
        console.log('update');
        return this._dbService.update(storeName, value);
    }

    add<T>(storeName: string, value: T): Observable<T & WithID> {
        console.log('add');
        return this._dbService.add(storeName, value);
    }

    bulkAddAndReturnValues<T>(storeName: string, values: T): Observable<T> {
        console.log('bulkAddAndReturnValues');
        const isArray = Array.isArray(values);
        let valuesArray = [];

        if (!isArray){
            valuesArray.push(values);
        } else {
            valuesArray = values;
        }

        return this.bulkAdd(storeName, valuesArray)
            .pipe(
                map((val: number[]) => values)
            );
    }

    bulkAdd<T>(storeName: string, values: T[]): Observable<number[]> {
        console.log('bulkAdd');
        return this._dbService.bulkAdd(storeName, values);
    }

    getByKey<T>(storeName: string, key: string): Observable<T> {
        console.log('getByKey');
        return this._dbService.getByKey(storeName, key);
    }

    getModifiedDate(key: string): Observable<LastModified> {
        console.log('getModifiedDate');
        return this.getByKey(nameof(LastModified), key);
    }

    private isObjectCacheable(storeName: string): boolean {
        const cacheableObjects: string[] = CacheConfig.schema.objectStoresMeta.map(x => x.store);
        const cacheableObject = cacheableObjects.find(x => x === storeName);
        const canCache = cacheableObject !== undefined;
        return canCache;
    }
}
