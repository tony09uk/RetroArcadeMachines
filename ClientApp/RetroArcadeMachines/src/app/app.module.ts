import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RuntimeConfigLoaderModule } from 'runtime-config-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './core/modules/header/header.module';
import { FooterModule } from './core/modules/footer/footer.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RuntimeConfigLoaderModule.forRoot(
      { configUrl: './assets/config.json' }
    ),
    FooterModule,
    HeaderModule,
    MatSnackBarModule // todo: conditionally load any mat...modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
 }
