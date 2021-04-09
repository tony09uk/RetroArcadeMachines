import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ComingSoonModule
  ]
})
export class GamesModule { }
