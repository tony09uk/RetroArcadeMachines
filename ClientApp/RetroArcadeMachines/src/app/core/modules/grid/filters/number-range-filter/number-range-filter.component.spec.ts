import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YesNoPipe } from '@core/pipes/yes-no.pipe';
import { of } from 'rxjs';
import { FilterTypes } from '../../enums/filter-types.enum';
import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

import { NumberRangeFilterComponent } from './number-range-filter.component';

describe('NumberRangeFilterComponent', () => {
  let gridFilterServiceMock: jasmine.SpyObj<GridFilterService>;

  let component: NumberRangeFilterComponent;
  let fixture: ComponentFixture<NumberRangeFilterComponent>;

  let column: Column;

  beforeEach(async () => {
    column = {
      name: 'test',
      filterType: FilterTypes.None,
      pipe: new YesNoPipe(),
      width: 100,
      friendlyName: 'friendlyTestName',
      distinctData: ['1', '10'] } as Column;

    gridFilterServiceMock = jasmine.createSpyObj<GridFilterService>('GridFilterService', [
      'getColumn',
      'watchColumnFilterChanged',
      'updateFilter'
    ]);
    gridFilterServiceMock.getColumn.and.returnValue(column);
    gridFilterServiceMock.watchColumnFilterChanged.and.returnValue(of(column));
    const gridFilterServicePropertySpy = jasmine.createSpy().and.returnValue('-');
    Object.defineProperty(gridFilterServiceMock, 'delimiter', { get: gridFilterServicePropertySpy });

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: GridFilterService, useValue: gridFilterServiceMock }
      ],
      declarations: [NumberRangeFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRangeFilterComponent);
    component = fixture.componentInstance;
    component.data = ['1', '10'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit', () => {
    it('should set the width to allow for two input fields and header padding', () => {
      expect(component.width).toBe('40');
    });

    it('should set the min and max value based on provided data', () => {
      fixture = TestBed.createComponent(NumberRangeFilterComponent);
      component = fixture.componentInstance;
      component.data = ['1', '10'];

      fixture.detectChanges();

      expect(component.minValue).toBe(1);
      expect(component.maxValue).toBe(10);
    });

    it('should set the min and max value to zero if data is undefined', () => {
      fixture = TestBed.createComponent(NumberRangeFilterComponent);
      component = fixture.componentInstance;
      component.data = undefined;

      fixture.detectChanges();

      expect(component.minValue).toBe(0);
      expect(component.maxValue).toBe(0);
    });

    it('should call updateFilter', () => {
      expect(gridFilterServiceMock.watchColumnFilterChanged).toHaveBeenCalled();
    });
  });

  it('should change min value and emit change', () => {
    component.minSelected = 15;
    component.maxSelected = 25;

    component.onChangeMin();

    expect(gridFilterServiceMock.updateFilter).toHaveBeenCalledWith(component.columnName, ['15-25']);
  });

  it('should change max value and emit change', () => {
    component.minSelected = 2;
    component.maxSelected = 30;

    component.onChangeMax();

    expect(gridFilterServiceMock.updateFilter).toHaveBeenCalledWith(component.columnName, ['2-30']);
  });
});
