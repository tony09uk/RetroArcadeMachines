import { Injectable } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private _configLoaderService: RuntimeConfigLoaderService) { }

    get api_url(): string {
        return this.getConfig('api_url');
    }

    private getConfig(value: string): any {
        return this._configLoaderService.getConfigObjectKey(value);
    }
}
