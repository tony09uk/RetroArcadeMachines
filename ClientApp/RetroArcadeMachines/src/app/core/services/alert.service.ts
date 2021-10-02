import { Injectable } from '@angular/core';

import { MatSnackBar, MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class AlertService { // todo: abstract matsnackbar
    constructor(private _matSnackbar: MatSnackBar) {}

    private _defaultVertPos: MatSnackBarVerticalPosition = 'top';
    private _defaultHoriPos: MatSnackBarHorizontalPosition = 'center';

    success(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos): void {
        this.showMessage(message, 'bg-success', vertPos, horiPos);
    }

    error(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos): void {
        this.showMessage(message, 'bg-error', vertPos, horiPos);
    }

    info(
        message: string,
        vertPos: MatSnackBarVerticalPosition = this._defaultVertPos,
        horiPos: MatSnackBarHorizontalPosition = this._defaultHoriPos): void {
        this.showMessage(message, 'bg-primary', vertPos, horiPos);
    }

    private showMessage(
        message: string,
        cssClass: string,
        vertPos: MatSnackBarVerticalPosition,
        horiPos: MatSnackBarHorizontalPosition): void {
        this._matSnackbar
            .open(message, 'Dismiss', {
                duration: 4000,
                horizontalPosition: horiPos,
                verticalPosition: vertPos,
                panelClass: [cssClass]
            });
    }
}
