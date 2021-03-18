import { Injectable } from '@angular/core';
import { Observable, Subject, merge, fromEvent, timer, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class IdleTimerService {

    constructor() { }

    private _timerReset$: Subject<boolean> = new Subject<boolean>();
    private _timer$: Subscription;
    private _idleSubscription$: Subscription;
    private _idle: Observable<any>;
    private _timeoutMilliseconds: number;
    private _storageKey = '_expiredTime';

    public expired$: Subject<boolean> = new Subject<boolean>();

    private startTimer(): void {
        const time = Date.now() + this._timeoutMilliseconds;
        localStorage.setItem(this._storageKey, time.toString());

        this._timer$ = timer(this._timeoutMilliseconds, this._timeoutMilliseconds).subscribe((res) => {
            this.expired$.next(true);
        });
    }

    public startWatching(timeoutInSecounds: number): Observable<any> {
        this._idle = merge(
            fromEvent(document, 'mousemove'),
            fromEvent(document, 'mousedown'),
            fromEvent(document, 'mousewheel'),
            fromEvent(document, 'click'),
            fromEvent(document, 'keypress'),
            fromEvent(document, 'touchmove'),
            fromEvent(document, 'DOMMouseScroll'),
            fromEvent(document, 'MSPointerMove'),
            fromEvent(window, 'mousemove'),
            fromEvent(window, 'resize'),
            fromEvent(window, 'storage')// todo: make conditional based on user input
        );

        this._timeoutMilliseconds = timeoutInSecounds * 1000;

        this._idleSubscription$ = this._idle.subscribe((res: any) => {
            this.resetTimer();
        });

        this.startTimer();

        return this.expired$;
    }

    public timerIsReset(): Observable<boolean> {
        return this._timerReset$;
    }

    public resetTimer(): void {
        this._timer$.unsubscribe();
        this._timerReset$.next(true);
        this.startTimer();
    }

    public stopTimer(): void {
        this.expired$.unsubscribe();
        this._timerReset$.unsubscribe();
        this._timer$.unsubscribe();
        this._idleSubscription$.unsubscribe();
    }
}
