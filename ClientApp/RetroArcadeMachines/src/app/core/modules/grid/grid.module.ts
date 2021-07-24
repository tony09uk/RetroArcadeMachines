import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { GridComponent } from './grid/grid.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { StringFilterComponent } from './filters/string-filter/string-filter.component';
import { MultiselectFilterComponent } from './filters/multiselect-filter/multiselect-filter.component';
import { NumberRangeFilterComponent } from './filters/number-range-filter/number-range-filter.component';
import { DateRangeFilterComponent } from './filters/date-range-filter/date-range-filter.component';
import { SliderModule } from '../slider/slider.module';

@NgModule({
  declarations: [
    GridComponent,
    FilterSelectorComponent,
    StringFilterComponent,
    MultiselectFilterComponent,
    NumberRangeFilterComponent,
    DateRangeFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatButtonModule,
    MatSelectModule,
    SliderModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
