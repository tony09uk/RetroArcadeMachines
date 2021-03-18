import { Component, OnDestroy, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { finalize, takeWhile, tap } from 'rxjs/operators';
import { IdleWarningStates } from '../enums/idle-warning.states.enum';
import { IdleService } from '../services/idle.service';

@Component({
  selector: 'app-idle-warning',
  templateUrl: './idle-warning.component.html',
  styleUrls: ['./idle-warning.component.scss']
})
export class IdleWarningComponent implements OnInit, OnDestroy {

  constructor(private _idleService: IdleService) { }

  private _dashArrayInitialValue: number[] = [283, 283];
  private _isComponentDestroyed = false;

  timeRemaining: number;
  warningTime: number;
  circleDashArray: string;
  barColourClassName = 'barColour-primary';

  ngOnInit(): void {
    this.circleDashArray = this._dashArrayInitialValue.join(',');
    this.warningTime = this._idleService.idleWarningTime;
    this.timeRemaining = this._idleService.idleWarningTime;
    this.startTimer();
  }

  ngOnDestroy(): void {
    this._isComponentDestroyed = true;
  }

  private startTimer(): void {
    this.setState(true);
    timer(0, 1000)
      .pipe(
        takeWhile(() => this.continueTimer()),
        finalize(() => this.setState(false)),
        tap(() => this.timeRemaining--),
        tap(() => {
          this.setCircleDashArray();
          this.setBarColourClassName();
        })
      ).subscribe();
  }

  private calculateTimeFractions(): number {
    return this.timeRemaining / this.warningTime;
  }

  private setCircleDashArray(): void {
    this.circleDashArray = `${(
      this.calculateTimeFractions() * this._dashArrayInitialValue[0]
    ).toFixed(0)}, ${this._dashArrayInitialValue[1]}`;
  }

  private setBarColourClassName(): void {
    const time = this.calculateTimeFractions();
    const isInLastHalf = time < 0.5 ? true : false;
    this.barColourClassName = isInLastHalf ?
      'barColour-warn' :
      'barColour-primary';
  }

  private setState(isInitalState: boolean): void {
    if (isInitalState) {
      this._idleService.currentIdleWarningState = IdleWarningStates.SecondaryTimerStarted;
      return;
    }

    this._idleService.currentIdleWarningState = this.timeRemaining > 0 ?
      IdleWarningStates.SecondaryTimerCancelled :
      IdleWarningStates.SecondaryTimerExpired;
  }

  private continueTimer(): boolean {
    if (!this._isComponentDestroyed && this.timeRemaining > 0) {
      return true;
    }
    return false;
  }
}
