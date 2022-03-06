import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutocompleteOption } from './models/autocomplete-option.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {
  // todo: extend BaseinputDirective
  @Input() options: AutocompleteOption[];
  @Input() label: string;
  @Input() placeholder: string;

  @Output() selectedOption: EventEmitter<AutocompleteOption> = new EventEmitter<AutocompleteOption>();

  myControl = new FormControl();

  clearInput(): void {
    this.myControl.setValue('');
  }

  selected(selected: AutocompleteOption): void {
    this.selectedOption.emit(selected);
  }
}
