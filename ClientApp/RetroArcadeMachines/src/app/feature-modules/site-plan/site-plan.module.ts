import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { SitePlanRoutingModule } from './site-plan-routing.module';
import { SitePlanComponent } from './site-plan.component';


@NgModule({
  declarations: [SitePlanComponent],
  imports: [
    CommonModule,
    SitePlanRoutingModule,
    ComingSoonModule
  ]
})
export class SitePlanModule { }
