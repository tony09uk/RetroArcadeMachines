import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GamesOverviewComponent } from './games-overview/games-overview.component';

const routes: Routes = [
  { path: '', component: GamesOverviewComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
