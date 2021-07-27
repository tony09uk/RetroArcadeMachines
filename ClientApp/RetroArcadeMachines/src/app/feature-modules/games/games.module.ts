import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GridModule } from '@core/modules/grid/grid.module';
import { ElementsModule } from '@shared/modules/elements/elements.module';

import { GamesRoutingModule } from './games-routing.module';
import { GamesOverviewComponent } from './games-overview/games-overview.component';

@NgModule({
  declarations: [
    GamesOverviewComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ElementsModule,
    GridModule
  ]
})
export class GamesModule { }
