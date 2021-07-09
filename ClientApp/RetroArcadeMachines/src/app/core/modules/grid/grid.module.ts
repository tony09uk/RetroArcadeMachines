import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { GridComponent } from './grid/grid.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';
import { MatSortModule } from '@angular/material/sort';
import { StringFilterComponent } from './filters/string-filter/string-filter.component';
import { MultiselectFilterComponent } from './filters/multiselect-filter/multiselect-filter.component';
import { NumberRangeFilterComponent } from './filters/number-range-filter/number-range-filter.component';
import { DateRangeFilterComponent } from './filters/date-range-filter/date-range-filter.component';

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
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [
    GridComponent
  ]
})
export class GridModule { }
