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
    private _baseUrl;

    constructor(
        private _http: HttpClient,
        private _configService: ConfigService) {
        this._headers = new HttpHeaders().set('Content-Type', 'application/json');
        this._baseUrl = this._configService.api_url;
    }

    public get<T>(url: string, params: HttpParams = new HttpParams()): Observable<T> {
        url = this.createUrl(url);
        return this._http.get<T>(url, { headers: this._headers, params })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    public delete<T>(url: string): Observable<T> {
        url = this.createUrl(url);
        return this._http.delete<T>(url, { headers: this._headers })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    public post<T>(url: string, body: string | object = {}): Observable<T> {
        url = this.createUrl(url);

        if (typeof body === 'string') {
            body = `\"${body}\"`;
        }

        return this._http.post<T>(url, body, { headers: this._headers })
                   .pipe(
                       retry(3), // todo: make configurable retry with backoff
                       catchError(val => throwError(val))
                    );
    }

    private createUrl(url: string): string {
        return this._baseUrl + url;
    }
}
