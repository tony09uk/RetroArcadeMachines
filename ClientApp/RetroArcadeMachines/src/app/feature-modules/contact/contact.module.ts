import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComingSoonModule } from '@shared/modules/coming-soon/coming-soon.module';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ComingSoonModule
  ]
})
export class ContactModule { }
