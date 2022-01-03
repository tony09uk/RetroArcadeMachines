import { Component, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StepBaseComponent } from '../step-base/step-base.component';

@Component({
  selector: 'app-step-content',
  templateUrl: './step-content.component.html',
  styleUrls: ['./step-content.component.scss']
})
export class StepContentComponent<T> implements OnInit, OnDestroy {

  @Input() componentType: any; // todo: change to specific type
  @Output() stepEvent: EventEmitter<T> = new EventEmitter<T>();

  @ViewChild('content', { read: ViewContainerRef, static: true} ) container!: ViewContainerRef;

  componentRef: ComponentRef<StepBaseComponent<T>>;  // todo: change to specific type

  private _isDestroyed: Subject<void> = new Subject();

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    if (!this.componentType) {
      return;
    }

    this.container.clear();
    this.componentRef = this.viewContainerRef.createComponent(this.componentType);
    this.componentRef
      .instance
      .events
      .pipe(
        takeUntil(this._isDestroyed)
      )
      .subscribe(
        (event: T) => { this.stepEvent.emit(event); }
      );
  }

  ngOnDestroy(): void {
    this.componentRef.destroy();
  }
}
