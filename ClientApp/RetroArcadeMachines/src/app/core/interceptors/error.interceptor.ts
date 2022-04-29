import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '@core/services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401, 403].includes(err.status) && this._authService.isLoggedIn) {
                // auto logout if 401 or 403 response returned from api
this._authService.signOut();
            }

            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.error('An error occurred:', err.error.message);
              } else {
                if (err.status === HttpStatusCode.NotModified) {
                    return of(new HttpResponse({
                        body: '',
                        headers: request.headers,
                        status: HttpStatusCode.NoContent,
                    }));
                }
              }

            const error = err.error?.message || err.statusText;
            return throwError(error);
        }));
    }
}
