import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TsIdleComponent } from './idle/ts-idle.component';

@NgModule({
    declarations: [TsIdleComponent],
    imports: [
        CommonModule,
        MatDialogModule
    ],
    exports: [TsIdleComponent]
})
export class TsIdleModule { }
