import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerSectionComponent } from './banner-section/banner-section.component';

@NgModule({
  declarations: [
    BannerSectionComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BannerSectionComponent
  ]
})
export class ElementsModule { }
