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


@NgModule({
  declarations: [
    InputComponent,
    TextareaComponent,
    BaseinputDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    InputComponent,
    TextareaComponent
  ]
})
export class FormModule { }
