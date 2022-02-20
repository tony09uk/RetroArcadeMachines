import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import { SocialUser } from 'angularx-social-login';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthState } from 'src/app/shared/models/auth-state.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: SocialUser;
  isLoggedIn: boolean;

  private _isDestroyed: Subject<void> = new Subject();

  constructor(
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService) { }

  ngOnInit(): void {
    // todo: check if token is valid and in cookies in the isLoggedIn property
    if (this._authService.isLoggedIn) {
      this.navigateToLoggedInTargetPage();
      return;
    }

    this._authService
      .authState$
      .pipe(
        takeUntil(this._isDestroyed)
      ).subscribe(
        (state: AuthState) => { this.handleAuthState(state); },
        (error: any) => { console.log(error); }
      );
  }

  ngOnDestroy(): void {
    this._isDestroyed.next();
    this._isDestroyed.complete();
  }

  signInWithFB(): void {
    this._authService.signIn();
  }

  signOut(): void {
    this._authService.signOut();
  }

  refreshToken(): void {
    this._authService.refreshToken();
  }

  private handleAuthState(state: AuthState): void {
    this.user = state.user;
    this.isLoggedIn = state.isLoggedIn;

    if (this.isLoggedIn) {
      this.navigateToLoggedInTargetPage();
    }
  }

  private navigateToLoggedInTargetPage(): void {
    // todo: how to make returnUrl type safe
    let returnUrl = this._activatedRouter.snapshot.queryParams.returnUrl;

    if (returnUrl === undefined) {
      returnUrl = '';
    }

    this._router.navigate([returnUrl]);
  }
}
