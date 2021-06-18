import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from '@shared/modules/table/table.module';
import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';
import { ElementsModule } from '@shared/modules/elements/elements.module';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ElementsModule,
    TableModule
  ]
})
export class GamesModule { }
