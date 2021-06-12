import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { TableModule } from '@shared/modules/table/table.module';
import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { RoadmapRoutingModule as RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ElementsModule } from '@shared/modules/elements/elements.module';


@NgModule({
  declarations: [
    RoadmapComponent
  ],
  imports: [
    CommonModule,
    RoadmapRoutingModule,
    ComingSoonModule,
    PipesModule,
    TableModule,
    MatTableModule,
    ElementsModule
  ]
})
export class RoadmapModule { }
