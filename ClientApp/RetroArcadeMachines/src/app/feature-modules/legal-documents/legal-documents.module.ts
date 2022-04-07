import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';



@NgModule({
  declarations: [
    PrivacyPolicyComponent,
    TermsAndConditionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LegalDocumentsModule { }
