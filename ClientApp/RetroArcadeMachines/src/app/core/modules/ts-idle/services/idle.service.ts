import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { IdleWarningStates } from '../enums/idle-warning.states.enum';
import { IdleTimerService } from './idle-timer.service';

@Injectable({
    providedIn: 'root'
})
export class IdleService {
    constructor(private _idleTimerService: IdleTimerService) { }

    private _currentIdleWarningState: Subject<IdleWarningStates> = new Subject();
    private _timerStopped: Subject<boolean> = new Subject();
    private _allowedIdleTime: number;
    private _idleWarningTime: number;

    get allowedIdleTime(): number {
        return this._allowedIdleTime;
    }

    set allowedIdleTime(value: number) {
        this._allowedIdleTime = value;
    }

    get idleWarningTime(): number {
        return this._idleWarningTime;
    }

    set idleWarningTime(value: number) {
        this._idleWarningTime = value;
    }

    set currentIdleWarningState(value: IdleWarningStates) {
        this._currentIdleWarningState.next(value);
    }

    startWatching(): Observable<IdleWarningStates> {
        return this._idleTimerService.startWatching(this.allowedIdleTime);
    }

    idleStateChanged(): Observable<IdleWarningStates> {
        return this._currentIdleWarningState;
    }

    timerStopped(): Observable<boolean> {
        return this._timerStopped;
    }

    timerResetOccoured(): Observable<boolean> {
        return this._idleTimerService.timerIsReset();
    }

    resetTimer(): void {
        this._idleTimerService.resetTimer();
    }

    stopTimer(): void {
        this._idleTimerService.stopTimer();
    }
}
