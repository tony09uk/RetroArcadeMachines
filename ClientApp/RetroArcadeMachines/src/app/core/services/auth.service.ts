import { Injectable } from '@angular/core';

import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ReplaySubject } from 'rxjs';
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

    constructor(private socialAuthService: SocialAuthService) {
        this.onInit();
    }

    signIn(): void {
        this.socialAuthService
            .signIn(FacebookLoginProvider.PROVIDER_ID)
            .then((user: SocialUser) => {
                this.handleAuthState(user);
            });
    }

    signOut(): void {
        this.socialAuthService.signOut(true);
        localStorage.removeItem(this.USER_STORAGE_KEY);
        this.user = null;
        this.isLoggedIn = false;
        this.triggerAuthStateEvent();
    }

    refreshToken(): void {
        this.socialAuthService.refreshAuthToken(FacebookLoginProvider.PROVIDER_ID);
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

        this.socialAuthService
            .authState
            .subscribe((user: SocialUser) => {
                this.user = user;
                this.triggerAuthStateEvent();
            });
    }

    private triggerAuthStateEvent(): void {
        this.isLoggedIn = (this.user != null);
        this.authState$
            .next({user: this.user, isLoggedIn: this.isLoggedIn} as AuthState);
    }
}
