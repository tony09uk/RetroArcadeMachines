import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { YesNoPipe } from '@core/pipes/yes-no.pipe';
import { of } from 'rxjs';
import { FilterTypes } from '../../enums/filter-types.enum';
import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

import { MultiselectFilterComponent } from './multiselect-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

const COLUM_DATA: Column = {
  name: 'test',
  filterType: FilterTypes.None,
  pipe: new YesNoPipe(),
  width: 100,
  friendlyName: 'friendlyTestName',
  distinctData: ['test1'] } as Column;

describe('MultiselectFilterComponent', () => {
  let gridFilterServiceMock: jasmine.SpyObj<GridFilterService>;

  let component: MultiselectFilterComponent;
  let fixture: ComponentFixture<MultiselectFilterComponent>;

  let column: Column;

  beforeEach(async () => {
    column = COLUM_DATA;
    gridFilterServiceMock = jasmine.createSpyObj<GridFilterService>('GridFilterService', ['getColumn', 'watchColumnFilterChanged']);
    gridFilterServiceMock.getColumn.and.returnValue(column);
    gridFilterServiceMock.watchColumnFilterChanged.and.returnValue(of(column));

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: GridFilterService, useValue: gridFilterServiceMock }
      ],
      declarations: [MultiselectFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiselectFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set friendlyName with correct data', () => {
    expect(component.friendlyName).toBe(column.friendlyName.toLocaleLowerCase());
  });

  it('should set width with correct data', () => {
    expect(component.width).toBe(column.width.toString());
  });

  it('should set multiSelectList with correct data', () => {
    expect(component.multiSelectList).toBe(column.distinctData);
  });

  it('should update multiselect selected values', () => {
    column.appliedFilters = ['test1', 'test1'];

    component.updateFilter(column);

    expect(component.multiSelect.value.length).toBe(2);
  });

  describe('pipeValue', () => {
    it('should return pipe value when pipe has been passed', () => {
      column = COLUM_DATA;
      column.pipe = new YesNoPipe();

      fixture = TestBed.createComponent(MultiselectFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const value = component.pipeValue('true');

      expect(value).toBe('Yes');
    });

    it('should return passed value when pipe has NOT been passed', () => {
      column = COLUM_DATA;
      column.pipe = undefined;

      fixture = TestBed.createComponent(MultiselectFilterComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const value = component.pipeValue('true');

      expect(value).toBe('true');
    });
  });
});
