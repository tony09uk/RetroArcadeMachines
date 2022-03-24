import { Injectable, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare let ga: Function;

@Injectable({
    providedIn: 'root'
})
export class GoogleAnalyticsService implements OnDestroy {

    private _isDestroyed$: Subject<void> = new Subject();
    constructor(public router: Router) {
        this.watchRoutingEvents(router);
    }

    ngOnDestroy(): void {
        this._isDestroyed$.next();
        this._isDestroyed$.complete();
    }

    private watchRoutingEvents(router: Router): void {
        this.router
            .events
            .pipe(
                takeUntil(this._isDestroyed$)
            ).subscribe(event => {
                if (event instanceof NavigationEnd) {
                    ga('set', 'page', event.urlAfterRedirects);
                    ga('send', 'pageview');
                }
            });
    }
}
