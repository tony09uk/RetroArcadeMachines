import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SitePlanComponent } from './site-plan.component';

const routes: Routes = [
  { path: '', component: SitePlanComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SitePlanRoutingModule { }
