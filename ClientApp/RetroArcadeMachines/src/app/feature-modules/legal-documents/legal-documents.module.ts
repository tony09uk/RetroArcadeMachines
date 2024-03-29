import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { LegalDocumentsRoutingModule } from './legal-documents-routing.module';
import { ElementsModule } from '@core/modules/elements/elements.module';
import { PersonalDataComponent } from './personal-data/personal-data.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    PersonalDataComponent
  ],
  imports: [
    CommonModule,
    LegalDocumentsRoutingModule,
    ElementsModule
  ]
})
export class LegalDocumentsModule { }
