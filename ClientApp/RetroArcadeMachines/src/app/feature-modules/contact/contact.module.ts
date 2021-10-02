import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoadingModule } from '@core/modules/loading/loading.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { ContactRoutingModule } from './contact-routing.module';
import { FormModule } from '@core/modules/form/form.module';
import { ButtonsModule } from '@core/modules/buttons/buttons.module';
import { ContactComponent } from './contact-form/contact.component';
import { SubmittedMessageComponent } from './submitted-message/submitted-message.component';

@NgModule({
  declarations: [ContactComponent, SubmittedMessageComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ElementsModule,
    LoadingModule,
    FormModule,
    ButtonsModule
  ]
})
export class ContactModule { }
