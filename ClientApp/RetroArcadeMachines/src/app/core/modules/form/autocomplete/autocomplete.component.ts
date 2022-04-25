import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/internal/Observable';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map, tap } from 'rxjs/operators';

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
  @Input() inputHintMessage: string;
  @Input() inputHintDispayRule: 'always' | 'whenNoResults';
  @Input() inputHintMessageAlign: 'start' | 'end';

  @Output() selectedOption: EventEmitter<AutocompleteOption> = new EventEmitter<AutocompleteOption>();
  @Output() hintClicked: EventEmitter<void> = new EventEmitter<void>();

  myControl = new FormControl();
  filteredOptions: Observable<AutocompleteOption[]>;
  showHint: boolean = false;

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
      tap(value => this.shouldShowHint(value.length))
    );
  }

  clearInput(): void {
    this.myControl.setValue('');
  }

  selected(selected: AutocompleteOption): void {
    this.selectedOption.emit(selected);
    this.clearInput();
  }

  onHintClicked(): void {
    this.hintClicked.emit();
  }

  private filter(value: string): AutocompleteOption[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.value.toLowerCase().includes(filterValue));
  }

  private shouldShowHint(length: number): void {
    if (this.inputHintDispayRule === 'always') {
      this.showHint = true;
    }

    this.showHint =
      length === 0 &&
      this.myControl.value !== null &&
      this.inputHintDispayRule === 'whenNoResults';
  }
}
