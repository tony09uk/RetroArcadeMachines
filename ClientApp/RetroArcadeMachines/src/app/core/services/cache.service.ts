import { Injectable } from '@angular/core';

import { iif, Observable, of } from 'rxjs';
import { NgxIndexedDBService, WithID } from 'ngx-indexed-db';
import { nameof } from 'ts-simple-nameof';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import { LastModified } from '@shared/models/last-modified.model';
import { HttpStatusCode } from '@angular/common/http';
import { CacheConfig } from 'src/app/shared/cache-config';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    constructor(private _dbService: NgxIndexedDBService) { }

    get<T>(storeName: string, id: string): Observable<T> {
        return this._dbService.getByKey(storeName, id);
    }

    getAll<T>(storeName: string): Observable<T[]> {
        return this._dbService.getAll(storeName);
    }

    bulkGetOrInsert<T>(value: T, lastModDate: string, updateCode: number, storeName: string): Observable<any> {
        if (!this.isObjectCacheable(storeName)) {
            return of(value);
        }

        const isModified = updateCode !== HttpStatusCode.NotModified;
        const lastModified = new LastModified(storeName, lastModDate);

        const update$ = this.update(nameof(LastModified), lastModified);
        const add$ = this.add(nameof(LastModified), lastModified);

        return this._dbService.count(nameof(LastModified), lastModified.name)
            .pipe(
                mergeMap((val: number) => iif(() => val > 0, update$, add$)),
                mergeMap(val => iif(() => isModified, this.bulkAddAndReturnValues(storeName, value), this.getAll(storeName)))
            );
    }

    updateByKey<T>(storeName: string, value: T, key: string): Observable<T> {
        return this._dbService.updateByKey(storeName, value, key);
    }

    update<T>(storeName: string, value: T): Observable<T[]> {
        return this._dbService.update(storeName, value);
    }

    add<T>(storeName: string, value: T): Observable<T & WithID> {
        return this._dbService.add(storeName, value);
    }

    bulkAddAndReturnValues<T>(storeName: string, values: T): Observable<T> {
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
        return this._dbService.bulkAdd(storeName, values);
    }

    getByKey<T>(storeName: string, key: string): Observable<T> {
        return this._dbService.getByKey(storeName, key);
    }

    getModifiedDate(key: string): Observable<LastModified> {
        return this.getByKey(nameof(LastModified), key);
    }

    private isObjectCacheable(storeName: string): boolean {
        const cacheableObjects: string[] = CacheConfig.schema.objectStoresMeta.map(x => x.store);
        const cacheableObject = cacheableObjects.find(x => x === storeName);
        const canCache = cacheableObject !== undefined;
        return canCache;
    }
}
