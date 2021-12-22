import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private _headers: HttpHeaders;
    private _readbaseUrl;
    private _writebaseUrl;

    constructor(
        private _http: HttpClient,
        private _configService: ConfigService) {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._readbaseUrl = this._configService.read_api_url;
        this._writebaseUrl = this._configService.write_api_url;
    }

    public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
        url = this.createUrl(this._readbaseUrl, url);
        return this._http.get<T>(url, { headers: this._headers, params })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    public delete<T>(url: string): Observable<T> {
        url = this.createUrl(this._writebaseUrl, url);
        return this._http.delete<T>(url, { headers: this._headers })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    public post<T>(url: string, body: string | object = {}): Observable<T> {
        url = this.createUrl(this._writebaseUrl, url);

        if (typeof body === 'string') {
            body = `\"${body}\"`;
        }

        return this._http.post<T>(url, body, { headers: this._headers })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    private createUrl(baseUrl: string, url: string): string {
        if (url.includes('https://') || url.includes('http://')) {
            return url;
        }

        return baseUrl + url;
    }
}
