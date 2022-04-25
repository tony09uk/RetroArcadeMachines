import { Injectable, Type } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { of, throwError } from 'rxjs';
import { catchError, map, mergeMap, retry, tap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { CacheService } from './cache.service';
import { LastModified } from '@shared/models/last-modified.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    private _headers: HttpHeaders;
    protected _readbaseUrl;
    protected _writebaseUrl;

    constructor(
        protected _http: HttpClient,
        protected _cacheService: CacheService,
        protected _configService: ConfigService) {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._readbaseUrl = this._configService.read_api_url;
        this._writebaseUrl = this._configService.write_api_url;
    }

    public get<T>(url: string, objName?: string, params: HttpParams = new HttpParams()): Observable<T> {
        if (url.startsWith('http')) {
            return this.getFromThirdPartyApi(url);
        }

        url = this.createUrl(this._readbaseUrl, url);
        let lastModifiedDate = '';

        return this._cacheService
            .getModifiedDate(objName)
            .pipe(
                tap((lastModified: LastModified) => lastModifiedDate = lastModified?.date),
                map((lastModified: LastModified) => this.addIfModifiedSinceHeader(lastModified?.date)),
            ).pipe(
                mergeMap((headers: HttpHeaders) =>
                    this._http.get<T>(url, { headers: headers, observe: 'response', params })
                        .pipe(
                            // retry(3), // todo: make configurable retry with backoff
                            catchError(error => this.handleError(error, lastModifiedDate)),
                        ))
            ).pipe(
                mergeMap((res: HttpResponse<T>) =>
                    this._cacheService.bulkGetOrInsert<T>(res.body, res.headers.get('last-modified'), res.status, objName)),
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

    private handleError(val: string | HttpErrorResponse, lastModifiedDate?: string): Observable<HttpResponse<any> | never> {
        // todo: add better error handling
        // error handling that needs to happen is in the ErrorInterceptor
        // add logging specific to this class
        return throwError(val);
    }

    private createUrl(baseUrl: string, url: string): string {
        if (url.includes('https://') || url.includes('http://')) {
            return url;
        }

        return baseUrl + url;
    }

    private addIfModifiedSinceHeader(dateModified: string): HttpHeaders {
        if (!dateModified) {
            return this._headers;
        }

        let getRequestHeader = this._headers;
        getRequestHeader = getRequestHeader.set('if-modified-since', dateModified);
        return getRequestHeader;
    }

    private getFromThirdPartyApi(url: string): any {
        this._http.get(url, { headers: this._headers })
            .pipe(
                catchError(error => this.handleError(error)),
            );
    }
}
