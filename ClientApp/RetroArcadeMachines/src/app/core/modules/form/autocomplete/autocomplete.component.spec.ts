import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {MatAutocompleteHarness} from '@angular/material/autocomplete/testing';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AutocompleteComponent } from './autocomplete.component';
import { AutocompleteOption } from './models/autocomplete-option.model';

const OPTIONS = [
  { id: 'New York', value: 'NY' } as AutocompleteOption,
  { id: 'Alabama', value: 'AL' } as AutocompleteOption,
  { id: 'California', value: 'CA' } as AutocompleteOption,
  { id: 'Florida', value: 'FL' } as AutocompleteOption,
];

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;
  let loader: HarnessLoader;

  const autoCompleteId = '#auto-complete-input';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatAutocompleteModule],
      declarations: [AutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all autocomplete harnesses', async () => {
    const autocompletes = await loader.getAllHarnesses(MatAutocompleteHarness);
    expect(autocompletes.length).toBe(1);
  });

  it('should focus and blur an input', async () => {
    const input = await loader.getHarness(MatAutocompleteHarness.with({selector: autoCompleteId}));
    expect(await input.isFocused()).toBe(false);
    await input.focus();
    expect(await input.isFocused()).toBe(true);
    await input.blur();
    expect(await input.isFocused()).toBe(false);
  });

  it('should be able to type in an input', async () => {
    const input = await loader.getHarness(MatAutocompleteHarness.with({selector: autoCompleteId}));
    await input.enterText('Test value');
    expect(await input.getValue()).toBe('Test value');
  });

  // todo: how to test when I have a ng-for in the template
  xit('should be able to get filtered options', async () => {
    const input = await loader.getHarness(MatAutocompleteHarness.with({selector: autoCompleteId}));
    await input.focus();
    const options = await input.getOptions({text: /New/});

    expect(options.length).toBe(1);
    expect(await options[0].getText()).toBe('New York');
  });
});

