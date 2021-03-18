import { Component, OnInit } from '@angular/core';
import { IdleWarningStates } from './core/modules/ts-idle/enums/idle-warning.states.enum';
import { IdleService } from './core/modules/ts-idle/services/idle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _idleService: IdleService) { }

  title = 'RetroArcadeMachines';
  idleTimer = true;

  ngOnInit(): void {
    this._idleService
      .idleStateChanged()
      .subscribe(
        val => {
          if (val === IdleWarningStates.SecondaryTimerExpired) {
            this._idleService.stopTimer();
            this.idleTimer = false;
          }
        }
      );
  }
}
