import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { DialogConfirmComponent } from '../dialog-confirm.component';
import { DialogConfirmData } from '../models/dialog-confirm.data.model';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor(private _dialog: MatDialog) { }

  dialogRef: MatDialogRef<DialogConfirmComponent>;

  public open(data: DialogConfirmData): void {
    this.dialogRef = this._dialog.open(DialogConfirmComponent, {
      data
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public confirmed(): Observable<boolean> {
    return this.dialogRef
            .afterClosed()
            .pipe(
              take(1),
              map((res: boolean) => res)
            );
  }
}
