import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-base',
  templateUrl: './step-base.component.html',
  styleUrls: ['./step-base.component.scss']
})
export class StepBaseComponent<T> implements OnInit {

  @Output() events: EventEmitter<T> = new EventEmitter<T>(); // todo: change any to type

  constructor() { }

  ngOnInit(): void {
  }
}
