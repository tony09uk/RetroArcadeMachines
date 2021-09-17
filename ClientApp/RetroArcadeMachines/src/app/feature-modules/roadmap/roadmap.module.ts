import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';

import { ComingSoonModule } from '@core/modules/coming-soon/coming-soon.module';
import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ElementsModule } from '@core/modules/elements/elements.module';
import { GridModule } from '@core/modules/grid/grid.module';

import { RoadmapRoutingModule as RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapComponent } from './roadmap/roadmap.component';

@NgModule({
  declarations: [
    RoadmapComponent
  ],
  imports: [
    CommonModule,
    RoadmapRoutingModule,
    ComingSoonModule,
    PipesModule,
    GridModule,
    MatTableModule,
    ElementsModule
  ]
})
export class RoadmapModule { }
