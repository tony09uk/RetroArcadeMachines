import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigService } from '@core/services/config.service';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private _configService: ConfigService,
        private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        const user = this._authService.user;
        const isLoggedIn = user?.authToken;
        const isApiUrl = request.url.startsWith(this._configService.read_api_url);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.authToken}` }
            });
        }

        return next.handle(request);
    }
}
