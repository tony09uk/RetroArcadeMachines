import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subscription} from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { tap } from 'rxjs/internal/operators/tap';
import { DialogConfirmData } from '../../dialog/dialog-confirm/models/dialog-confirm.data.model';
import { DialogConfirmService } from '../../dialog/dialog-confirm/services/dialog-confirm.service';
import { IdleWarningComponent } from '../countdown/idle-warning.component';
import { IdleWarningStates } from '../enums/idle-warning.states.enum';
import { IdleService } from '../services/idle.service';

@Component({
  selector: 'app-ts-idle',
  template: ``
})
export class TsIdleComponent implements OnInit, OnDestroy {

  constructor(
    private _idleService: IdleService,
    private _dialogConfirmService: DialogConfirmService) { }

  private _isIdlePopupOpen = false;
  private _subscriptionsArray$: Subscription[] = [];

  @Input() allowedIdleTimeInSeconds = 60;
  @Input() warningTimeInSeconds = 10;

  ngOnInit(): void {
    this._idleService.allowedIdleTime = this.allowedIdleTimeInSeconds;
    this._idleService.idleWarningTime = this.warningTimeInSeconds;

    this.watchTimeout();
    this.watchStateChanged();
    this.watchTimerReset();
  }

  ngOnDestroy(): void {
    this._subscriptionsArray$.forEach(item => {
      item.unsubscribe();
    });
    this._idleService.stopTimer();
    this._dialogConfirmService.close();
  }

  private watchTimeout(): void {
    const sub$ = this._idleService
                  .startWatching()
                  .pipe(
                    tap(() => this._idleService.currentIdleWarningState = IdleWarningStates.PrimaryTimerExpired)
                  )
                  .subscribe();

    this._subscriptionsArray$.push(sub$);
  }

  private watchStateChanged(): void {
    const sub$ = this._idleService
                  .idleStateChanged()
                  .pipe(
                    mergeMap((state: IdleWarningStates) => this.showTimeoutWarning(state))
                  )
                  .subscribe((data: boolean | null) => this.setState(data));

    this._subscriptionsArray$.push(sub$);
  }

  private showTimeoutWarning(state: IdleWarningStates): Observable<boolean | null> {
    if (state === IdleWarningStates.PrimaryTimerExpired) {
      this._isIdlePopupOpen = true;

      const data: DialogConfirmData = {
        title: 'Logging out',
        component: IdleWarningComponent,
        showFooter: false
      };

      this._dialogConfirmService.open(data);
      return this._dialogConfirmService.confirmed();
    }
    return of(null);
  }

  private setState(action: boolean | null): void {
    if (action === null) {
      return;
    }

    this._idleService.currentIdleWarningState = action ?
      IdleWarningStates.PrimaryTimerStarted :
      IdleWarningStates.SecondaryTimerExpired;
  }

  private watchTimerReset(): void {
    const sub$ = this._idleService
                    .timerResetOccoured()
                    .subscribe(() => this.closeDialog());

    this._subscriptionsArray$.push(sub$);
  }

  // private watchTimerStopped(): void {
  //   this.closeDialog();
  // }

  private closeDialog(): void {
    if (!this._isIdlePopupOpen) {
      return;
    }
    this._dialogConfirmService.close();
    this._isIdlePopupOpen = false;
  }
}
