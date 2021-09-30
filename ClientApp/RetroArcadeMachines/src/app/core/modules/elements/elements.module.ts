import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { BannerSectionComponent } from './banner-section/banner-section.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    BannerSectionComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    BannerSectionComponent,
    CardComponent
  ]
})
export class ElementsModule { }
