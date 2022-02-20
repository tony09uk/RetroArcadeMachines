import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StepErrorEvent } from '../models/step-error.event';

@Component({
  selector: 'app-step-base',
  templateUrl: './step-base.component.html',
  styleUrls: ['./step-base.component.scss']
})
export class StepBaseComponent<T> implements OnInit {

  @Output() stepError = new EventEmitter();
  @Output() events: EventEmitter<T> = new EventEmitter<T>(); // todo: change any to type

  constructor() { }

  ngOnInit(): void {
  }

  emitError<K>(stepName: string, errorVal: K): void {
    const error = {
      stepName: stepName,
      error: errorVal
    } as StepErrorEvent<K>;
    this.stepError.emit(error);
  }
}
