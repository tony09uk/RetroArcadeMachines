import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ComingSoonComponent } from './coming-soon.component';

@NgModule({
  declarations: [
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ComingSoonComponent
  ]
})
export class ComingSoonModule { }
