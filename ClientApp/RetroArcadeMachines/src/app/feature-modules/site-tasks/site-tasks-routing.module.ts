import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteTasksComponent } from './site-tasks.component';

const routes: Routes = [
  { path: '', component: SiteTasksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteTasksRoutingModule { }
