import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesNoPipe } from './yes-no.pipe';



@NgModule({
  declarations: [YesNoPipe],
  imports: [
    CommonModule
  ],
  exports: [YesNoPipe]
})
export class PipesModule { }
