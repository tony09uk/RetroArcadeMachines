import { Component, ComponentFactoryResolver, ComponentRef, Inject, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogConfirmData } from './models/dialog-confirm.data.model';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogConfirmComponent implements OnInit {

  constructor(
    private _matDialogRef: MatDialogRef<DialogConfirmComponent>,
    private _resolver: ComponentFactoryResolver,
    @Inject(MAT_DIALOG_DATA) public data: DialogConfirmData) { }

  @ViewChild('target', { read: ViewContainerRef, static: true}) vcRef: ViewContainerRef;
  isSaveDisabled = false;
  isCancelDisabled = false;
  showFooter = false;
  componentRef: ComponentRef<any>;

  ngOnInit(): void {
    const factory = this._resolver.resolveComponentFactory(this.data.component);
    this.componentRef = this.vcRef.createComponent(factory);
    this.setFooterElements(this.componentRef.instance);
  }

  private setFooterElements(componentInstance: any): void {
    this.showFooter = this.data.showFooter;

    componentInstance.isSaveDisabled === undefined ?
      this.isSaveDisabled = false :
      this.isSaveDisabled = componentInstance.isSaveDisabled;

    componentInstance.isCancelDisabled === undefined ?
      this.isCancelDisabled = false :
      this.isCancelDisabled = componentInstance.isCancelDisabled;
  }

  public cancel(): void {
    this.close(false);
  }

  public close(value: boolean): void {
    this._matDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  public onEsc(): void {
    this.close(false);
  }
}
