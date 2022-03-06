import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YesNoPipe } from '@core/pipes/yes-no.pipe';
import { of } from 'rxjs';
import { FilterTypes } from '../../enums/filter-types.enum';
import { FilterSelectorComponent } from '../../filter-selector/filter-selector.component';
import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';

import { GridComponent } from '../grid.component';
import { TestGridConfig } from './grid.config.data';

describe('GridComponent', () => {
  let gridFilterServiceMock: jasmine.SpyObj<GridFilterService>;

  let component: GridComponent<any>;
  let fixture: ComponentFixture<GridComponent<any>>;

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
      'updateFilter',
      'initFilters',
      'clearFilters'
    ]);
    gridFilterServiceMock.getColumn.and.returnValue(column);
    gridFilterServiceMock.watchColumnFilterChanged.and.returnValue(of(column));

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: GridFilterService, useValue: gridFilterServiceMock }
      ],
      declarations: [
        GridComponent,
        FilterSelectorComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    component.gridConfig = TestGridConfig.create();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnit', () => {
    it('should set the dataSource', () => {
      expect(component.dataSource).toBeTruthy();
    });

    it('should call initFilters', () => {
      expect(gridFilterServiceMock.initFilters).toHaveBeenCalled();
    });

    it('should call watchColumnFilterChanged', () => {
      expect(gridFilterServiceMock.watchColumnFilterChanged).toHaveBeenCalled();
    });

    it('should populate columnFilters', () => {
      expect(component.columnFilters).toBeTruthy();
    });

    it('should setColumnVisibility', () => {
      expect(component.hideColumnValues.length).toBe(4);
      expect(component.hideColumnValues[0].value).toBe(false);
      expect(component.hideColumnValues[1].value).toBe(false);
      expect(component.hideColumnValues[2].value).toBe(false);
      expect(component.hideColumnValues[3].value).toBe(false);
    });
  });

  describe('clearFilters', () => {
    it('should call clearFilters', () => {
      component.clearFilters();

      expect(gridFilterServiceMock.clearFilters).toHaveBeenCalled();
    });

    it('should set isFilter to false', () => {
      component.isFiltered = true;
      component.clearFilters();

      expect(component.isFiltered).toBe(false);
    });
  });

  describe('rowClicked', () => {
    it('should emit row emit event', () => {
      component.rowClickedEvent
        .subscribe(val => {
          expect(val).toBe(column);
        });
      component.rowClicked(column);
    });
  });

  describe('getFilterDef', () => {
    it('should suffix with -description', () => {
      const sut = component.getFilterDef('testProp');
      expect(sut).toEqual('testProp-description');
    });
  });

  describe('setVisisibility', () => {
    it('should return true when alwaysHide is true', () => {
      const sut = component.setVisisibility('test', true);
      expect(sut).toBe(true);
    });

    it('should return false when passed key does NOT match any column values', () => {
      const sut = component.setVisisibility('test', false);
      expect(sut).toBe(false);
    });

    it('should return true when found column value is true', () => {
      const sut = component.setVisisibility('name', false);
      expect(sut).toBe(true);
    });

    it('should return false when found column value is false', () => {
      const sut = component.setVisisibility('entryPrice', false);
      expect(sut).toBe(false);
    });
  });
});
