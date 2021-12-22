import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TextareaComponent } from './textarea/textarea.component';
import { BaseinputDirective } from './baseinput.directive';
import { InputComponent } from './input/input.component';
import { GooglePlacesInputComponent } from './input/google-places-input/google-places-input.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';


@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    BaseinputDirective,
    GooglePlacesInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    InputComponent,
    TextareaComponent,
    GooglePlacesInputComponent,
  ]
})
export class FormModule { }
