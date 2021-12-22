import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { ElementsModule } from '@core/modules/elements/elements.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ElementsModule
  ]
})
export class AuthenticationModule { }
