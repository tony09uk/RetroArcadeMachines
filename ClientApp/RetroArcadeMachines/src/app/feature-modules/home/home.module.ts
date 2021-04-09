import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HeroComponent } from './hero/hero.component';
import { AboutComponent } from './about/about.component';
import { MoreInfoComponent } from './more-info/more-info.component';

@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
    AboutComponent,
    MoreInfoComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
