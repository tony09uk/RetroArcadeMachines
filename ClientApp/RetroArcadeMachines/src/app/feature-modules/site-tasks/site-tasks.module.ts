import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { SiteTasksRoutingModule } from './site-tasks-routing.module';
import { SiteTasksComponent } from './site-tasks.component';


@NgModule({
  declarations: [SiteTasksComponent],
  imports: [
    CommonModule,
    SiteTasksRoutingModule,
    ComingSoonModule
  ]
})
export class SiteTasksModule { }
