import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatListModule } from '@angular/material/list';

import { BannerSectionComponent } from './banner-section/banner-section.component';
import { CardComponent } from './card/card.component';
import { IconComponent } from './icon/icon.component';
import { StepperComponent } from './stepper/stepper.component';
import { StepContentComponent } from './stepper/step-content/step-content.component';
import { StepBaseComponent } from './stepper/step-base/step-base.component';
import { ListComponent } from './list/list.component';
import { HelpRequestComponent } from './help-request/help-request.component';

@NgModule({
  declarations: [
    BannerSectionComponent,
    CardComponent,
    IconComponent,
    StepperComponent,
    StepContentComponent,
    StepBaseComponent,
    ListComponent,
    HelpRequestComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [
    BannerSectionComponent,
    CardComponent,
    IconComponent,
    StepperComponent,
    ListComponent,
    HelpRequestComponent
  ]
})
export class ElementsModule { }
