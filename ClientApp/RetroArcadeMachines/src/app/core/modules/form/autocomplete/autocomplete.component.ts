import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/operators';

import { AutocompleteOption } from './models/autocomplete-option.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  // todo: extend BaseinputDirective
  @Input() options: AutocompleteOption[];
  @Input() label: string;
  @Input() placeholder: string;

  @Output() selectedOption: EventEmitter<AutocompleteOption> = new EventEmitter<AutocompleteOption>();

  myControl = new FormControl();
  filteredOptions: Observable<AutocompleteOption[]>;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  clearInput(): void {
    this.myControl.setValue('');
  }

  selected(selected: AutocompleteOption): void {
    this.selectedOption.emit(selected);
    this.clearInput();
  }

  private filter(value: string): AutocompleteOption[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }
}
