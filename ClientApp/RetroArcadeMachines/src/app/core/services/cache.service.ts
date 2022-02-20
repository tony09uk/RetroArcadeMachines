import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class CacheService {
    get<T>(key: T): T {
        return key;
    }

    add<T>(key: string, value: T): void {
        
        
    }
}