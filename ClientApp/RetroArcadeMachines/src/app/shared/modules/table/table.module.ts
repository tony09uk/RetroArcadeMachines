import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    PipesModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
