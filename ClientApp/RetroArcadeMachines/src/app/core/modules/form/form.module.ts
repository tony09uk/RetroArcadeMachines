import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { TextareaComponent } from './textarea/textarea.component';
import { BaseinputDirective } from './baseinput.directive';
import { InputComponent } from './input/input.component';
import { GooglePlacesInputComponent } from './input/google-places-input/google-places-input.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';


@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    BaseinputDirective,
    GooglePlacesInputComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    GooglePlacesInputComponent,
    AutocompleteComponent
  ]
})
export class FormModule { }
