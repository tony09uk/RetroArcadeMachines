import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { StepperOrientation } from '@angular/material/stepper';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StepNavigationEvent } from './models/step-navigation.event';
import { Step } from './models/step.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  @Input() steps: Step[];
  @Output() events: EventEmitter<any> = new EventEmitter<any>();
  @Output() stepChanged: EventEmitter<StepNavigationEvent> = new EventEmitter<StepNavigationEvent>();

  stepperOrientation: Observable<StepperOrientation>;

  constructor(breakpointObserver: BreakpointObserver) {
    // todo: move this in to ngOnInit
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {

  }

  handleEvent(event: any): void {
    this.events.emit(event);
  }

  onStepChange(event: StepperSelectionEvent): void {
    this.stepChanged.emit({
      isForwardNavigation: event.previouslySelectedIndex < event.selectedIndex,
      previouslySelectedIndex: event.previouslySelectedIndex,
      selectedIndex: event.selectedIndex,
      selectedLabel: event.selectedStep.label
    } as StepNavigationEvent);
  }
}
