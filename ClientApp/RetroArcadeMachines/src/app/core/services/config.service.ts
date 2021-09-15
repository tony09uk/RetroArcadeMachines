import { Injectable } from '@angular/core';
import { RuntimeConfigLoaderService } from 'runtime-config-loader';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    constructor(private _configLoaderService: RuntimeConfigLoaderService) { }

    get read_api_url(): string {
        return this.getConfig('read_api_url');
    }

    get write_api_url(): string {
        return this.getConfig('write_api_url');
    }

    private getConfig(value: string): any {
        return this._configLoaderService.getConfigObjectKey(value);
    }
}
