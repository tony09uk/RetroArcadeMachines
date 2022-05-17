import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

import { AuthState } from 'src/app/shared/models/auth-state.model';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn: boolean = false;
    user: SocialUser = null;

    // todo: make this private
    authState$: ReplaySubject<AuthState> = new ReplaySubject<AuthState>(1);

    private USER_STORAGE_KEY = 'user';

    constructor(
        private _socialAuthService: SocialAuthService,
        private _httpClient: HttpClient,
    ) {
        this.onInit();
    }

    signIn(): void {
        this._socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then((user: SocialUser) => {
                this.handleAuthState(user);
            });
    }

    signOut(): void {
        this._socialAuthService.signOut(true);
        localStorage.removeItem(this.USER_STORAGE_KEY);
        this.user = undefined;
        this.isLoggedIn = false;
        this.triggerAuthStateEvent();
    }

    refreshToken(): void {
        this._socialAuthService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
    }

    private handleAuthState(user: SocialUser): void {
        this.user = user;
        this.isLoggedIn = true;

        localStorage.setItem(this.USER_STORAGE_KEY, JSON.stringify(this.user));

        this.authState$
            .next({ isLoggedIn: this.isLoggedIn, user: this.user } as AuthState);
    }

    private onInit(): void {
        this.user = JSON.parse(localStorage.getItem(this.USER_STORAGE_KEY));
        // todo: call server to check if user is logged in

        this.triggerAuthStateEvent();

        this.refreshToken();

        this._socialAuthService
            .authState
            .pipe(
                tap((user: SocialUser) => this.user = user),
                map((user: SocialUser) => { this.callAuthProvider(user?.authToken); })
            )
            .subscribe(
                (res: any) => {  console.log(res); this.triggerAuthStateEvent(); },
                (err: HttpErrorResponse) => { this.signOut(); }
            );
    }

    private triggerAuthStateEvent(): void {
        this.isLoggedIn = (this.user != null);
        this.authState$
            .next({user: this.user, isLoggedIn: this.isLoggedIn} as AuthState);
    }

    private callAuthProvider(authToken: string): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._httpClient
            .get(`https://graph.facebook.com/me?access_token=${authToken}&debug=all`, { headers: headers });
    }
}
