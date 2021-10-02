import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { BannerSectionComponent } from './banner-section/banner-section.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';

@NgModule({
  declarations: [
    BannerSectionComponent,
    CardComponent,
    IconComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    BannerSectionComponent,
    CardComponent,
    IconComponent
  ]
})
export class ElementsModule { }
