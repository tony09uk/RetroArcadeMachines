import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoadingModule } from '@core/modules/loading/loading.module';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { FormModule } from '@core/modules/form/form.module';
import { ButtonsModule } from '@core/modules/buttons/buttons.module';

@NgModule({
  declarations: [ContactComponent],
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
