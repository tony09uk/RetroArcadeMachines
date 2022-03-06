import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { SocialUser } from 'angularx-social-login';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from 'src/app/shared/models/auth-state.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  name: string;
  imageUrl: string;

  private _isDestroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.setLoginStatus(this._authService.isLoggedIn, this._authService.user);

    this._authService
      .authState$
      .pipe(
        takeUntil(this._isDestroyed$)
      ).subscribe(
        (authState: AuthState) => { this.setLoginStatus(authState.isLoggedIn, authState.user); }
      );
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next(true);
    this._isDestroyed$.complete();
  }

  private setLoginStatus(isLoggedIn: boolean, user: SocialUser): void {
    this.isLoggedIn = isLoggedIn;
    if (this.isLoggedIn) {
      this.name = user.name;
      this.imageUrl = user.photoUrl;
    }
  }
}
