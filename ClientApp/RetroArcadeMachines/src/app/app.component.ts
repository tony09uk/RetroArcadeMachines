import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isDevMode } from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { ConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'RetroArcadeMachines';

  private _isDestroyed$: Subject<void> = new Subject();
  constructor(
    private _router: Router,
    private _configService: ConfigService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit(): void {
    console.log('is dev mode: ' + isDevMode());

    // todo: add this only on add.component page load
    const script = this._renderer2.createElement('script');
    const key = this._configService.google_places_api_key;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=en`;

    this._renderer2.appendChild(this._document.body, script);

    this.watchRoutingEvents(this._router);
  }

  ngOnDestroy(): void {
    this._isDestroyed$.next();
    this._isDestroyed$.complete();
  }

  private watchRoutingEvents(router: Router): void {
    router
      .events
      .pipe(
        takeUntil(this._isDestroyed$)
      ).subscribe(event => {
        if (event instanceof NavigationEnd) {
          (window as any).gtag('set', 'page', event.urlAfterRedirects);
          (window as any).gtag('send', 'pageview');
        }
      });
  }
}
