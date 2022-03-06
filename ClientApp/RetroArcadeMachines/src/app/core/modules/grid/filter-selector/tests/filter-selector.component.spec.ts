import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterTypes } from '../../enums/filter-types.enum';

import { Column } from '../../models/column.model';
import { GridFilterService } from '../../services/grid-filter-service';
import { FilterSelectorComponent } from '../filter-selector.component';
import { FakeDateRangeFilterComponent, FakeMultiselectFilterComponent, FakeNumberRangeFilterComponent, FakeStringFilterComponent } from './filter-selector.component.stub';

describe('FilterSelectorComponent', () => {
  let gridFilterServiceMock: jasmine.SpyObj<GridFilterService>;

  let component: FilterSelectorComponent;
  let fixture: ComponentFixture<FilterSelectorComponent>;

  const columnName = 'test';

  beforeEach(async () => {
    gridFilterServiceMock = jasmine.createSpyObj<GridFilterService>('GridFilterService', ['getColumn']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: GridFilterService, useValue: gridFilterServiceMock }
      ],
      declarations: [
        FilterSelectorComponent,
        FakeDateRangeFilterComponent,
        FakeMultiselectFilterComponent,
        FakeNumberRangeFilterComponent,
        FakeStringFilterComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterSelectorComponent);
    component = fixture.componentInstance;
    component.columnName = columnName;
  });

  it('should create', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.None } as Column);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should call get service to get column based on name', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.None } as Column);
    fixture.detectChanges();

    expect(gridFilterServiceMock.getColumn).toHaveBeenCalledWith(columnName);
  });

  it('should show date range filter', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.DateRange } as Column);
    fixture.detectChanges();

    const element: HTMLInputElement = fixture.debugElement.query(By.css('app-date-range-filter')).nativeElement;
    expect(element).toBeTruthy();
  });

  it('should show number range filter', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.NumberRange } as Column);
    fixture.detectChanges();

    const element: HTMLInputElement = fixture.debugElement.query(By.css('app-number-range-filter')).nativeElement;
    expect(element).toBeTruthy();
  });

  it('should show multi select filter', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.MultiSelect } as Column);
    fixture.detectChanges();

    const element: HTMLInputElement = fixture.debugElement.query(By.css('app-multiselect-filter')).nativeElement;
    expect(element).toBeTruthy();
  });

  it('should show string filter', () => {
    gridFilterServiceMock.getColumn.and.returnValue({ name: columnName, filterType: FilterTypes.String } as Column);
    fixture.detectChanges();

    const element: HTMLInputElement = fixture.debugElement.query(By.css('app-string-filter')).nativeElement;
    expect(element).toBeTruthy();
  });
});
