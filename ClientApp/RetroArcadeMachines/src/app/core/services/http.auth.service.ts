import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';

import { ConfigService } from './config.service';

import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root'
})
export class HttpAuthService extends HttpService {
    constructor(
        _http: HttpClient,
        _cacheService: CacheService,
        _configService: ConfigService ) {
        super(_http, _cacheService, _configService);
        this.init();
    }

    private init() {
        this._writebaseUrl = this._configService.write_api_url_auth;
    }
}
