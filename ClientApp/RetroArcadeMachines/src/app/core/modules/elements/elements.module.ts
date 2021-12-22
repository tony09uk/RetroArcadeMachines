import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { BannerSectionComponent } from './banner-section/banner-section.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';
import { StepperComponent } from './stepper/stepper.component';

@NgModule({
  declarations: [
    BannerSectionComponent,
    CardComponent,
    IconComponent,
    StepperComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    BannerSectionComponent,
    CardComponent,
    IconComponent,
    StepperComponent
  ]
})
export class ElementsModule { }
