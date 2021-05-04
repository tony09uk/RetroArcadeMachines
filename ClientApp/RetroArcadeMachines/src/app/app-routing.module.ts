import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./feature-modules/home/home.module').then(h => h.HomeModule) },
  { path: 'roadmap', loadChildren: () => import('./feature-modules/roadmap/roadmap.module').then(h => h.RoadmapModule) },
  { path: 'games', loadChildren: () => import('./feature-modules/games/games.module').then(h => h.GamesModule) },
  { path: 'locations', loadChildren: () => import('./feature-modules/locations/locations.module').then(h => h.LocationsModule) },
  { path: 'tasks', loadChildren: () => import('./feature-modules/site-tasks/site-tasks.module').then(h => h.SiteTasksModule) },
  { path: 'contact', loadChildren: () => import('./feature-modules/contact/contact.module').then(h => h.ContactModule) },
  { path: '**', loadChildren: () => import('./feature-modules/not-found/not-found.module').then(h => h.NotFoundModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
