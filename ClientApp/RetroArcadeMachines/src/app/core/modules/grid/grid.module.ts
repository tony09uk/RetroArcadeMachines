import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from './grid/grid.component';
import { FilterSelectorComponent } from './filter-selector/filter-selector.component';

@NgModule({
  declarations: [GridComponent, FilterSelectorComponent],
  imports: [
    CommonModule
  ]
})
export class GridModule { }
