import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RuntimeConfig, RuntimeConfigLoaderService } from 'runtime-config-loader';

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

    get write_api_url_auth(): string {
        return this.getConfig('write_api_url_auth');
    }

    get google_places_api_key(): string {
        return this.getConfig('google_places_api_key');
    }

    static get google_places_api_key(): string {
        return this.getConfig('google_places_api_key');
    }

    static get fb_key(): string {
        return this.getConfig('fb_key');
    }

    private static getConfig(value: string): any {
        const httpClient = new HttpClient({ } as HttpHandler);
        const config = new RuntimeConfig();
        const configLoaderService = new RuntimeConfigLoaderService(httpClient, config);

        const tep = configLoaderService.getConfigObjectKey(value);

        return configLoaderService.getConfigObjectKey(value);
    }

    private getConfig(value: string): any {
        return this._configLoaderService.getConfigObjectKey(value);
    }
}
