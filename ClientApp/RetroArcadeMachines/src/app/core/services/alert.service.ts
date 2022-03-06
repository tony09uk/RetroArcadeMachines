import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertService { // todo: abstract matsnackbar
    constructor(private _matSnackbar: MatSnackBar) {}

    private _defaultVertPos: MatSnackBarVerticalPosition = 'top';
    private _defaultHoriPos: MatSnackBarHorizontalPosition = 'center';
    private _defaultDuration: number = 4000;

    success(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos,
        duration: number = this._defaultDuration): void {
        this.showMessage(message, 'bg-success', vertPos, horiPos, duration);
    }

    error(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos,
        duration: number = this._defaultDuration): void {
        this.showMessage(message, 'bg-error', vertPos, horiPos, duration);
    }

    info(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos,
        duration: number = this._defaultDuration): void {
        this.showMessage(message, 'bg-accent', vertPos, horiPos, duration);
    }

    private showMessage(
        message: string,
        cssClass: string,
        vertPos: MatSnackBarVerticalPosition,
        horiPos: MatSnackBarHorizontalPosition,
        duration: number): void {
        this._matSnackbar
            .open(message, 'Dismiss', {
                duration: duration,
                horizontalPosition: horiPos,
                verticalPosition: vertPos,
                panelClass: [cssClass]
            });
    }
}
