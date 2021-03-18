import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [DialogConfirmComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class DialogConfirmModule { }
