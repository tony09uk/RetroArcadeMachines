import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YesNoPipe } from '@core/pipes/yes-no.pipe';
import { of } from 'rxjs';

import { FilterTypes } from '../../enums/filter-types.enum';
import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';
import { StringFilterComponent } from './string-filter.component';

describe('StringFilterComponent', () => {
  let gridFilterServiceMock: jasmine.SpyObj<GridFilterService>;

  let component: StringFilterComponent;
  let fixture: ComponentFixture<StringFilterComponent>;

  let column: Column;

  beforeEach(async () => {
    column = {
      name: 'test',
      filterType: FilterTypes.None,
      pipe: new YesNoPipe(),
      width: 100,
      friendlyName: 'friendlyTestName',
      distinctData: ['1', '10'],
      appliedFilters: ['val1', 'val2']
    } as Column;

    gridFilterServiceMock = jasmine.createSpyObj<GridFilterService>('GridFilterService', [
      'getColumn',
      'watchColumnFilterChanged',
      'updateFilter'
    ]);
    gridFilterServiceMock.getColumn.and.returnValue(column);
    gridFilterServiceMock.watchColumnFilterChanged.and.returnValue(of(column));

    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        { provide: GridFilterService, useValue: gridFilterServiceMock }
      ],
      declarations: [StringFilterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnIt', () => {
    it('should set filters', () => {
      expect(component.filter).toBe('val1,val2');
    });

    it('should set width', () => {
      expect(component.width).toBe('100');
    });

    it('should call watchColumnFilterChanged', () => {
      expect(gridFilterServiceMock.watchColumnFilterChanged).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('should return when keyboard event is Tab', () => {
      const keyboardEvent = { key: 'Tab'} as KeyboardEvent;

      component.onChange(keyboardEvent);

      expect(gridFilterServiceMock.updateFilter).toHaveBeenCalledTimes(0);
    });

    it('should emit event when keyboard event is NOT Tab', () => {
      const keyboardEvent = { key: 'Space'} as KeyboardEvent;

      component.onChange(keyboardEvent);

      expect(gridFilterServiceMock.updateFilter).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClear', () => {
    it('should clear filter', () => {
      component.onClear();

      expect(component.filter).toBeFalsy();
    });

    it('should emit event when cleared', () => {
      component.onClear();

      expect(gridFilterServiceMock.updateFilter).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateFilter', () => {
    it('should set filter with applied filters when column name matches', () => {
      component.filter = '';
      component.updateFilter(column);

      expect(component.filter).toBe('val1,val2');
    });
  });
});
