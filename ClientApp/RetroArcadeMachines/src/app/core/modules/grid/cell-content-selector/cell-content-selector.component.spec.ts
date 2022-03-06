import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellContentTypes } from '../enums/cell-content-types.enum';

import { CellContentSelectorComponent } from './cell-content-selector.component';

// todo: fix module import issue
xdescribe('CellContentSelectorComponent', () => {
  let component: CellContentSelectorComponent<any>;
  let fixture: ComponentFixture<CellContentSelectorComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CellContentTypes
      ],
      declarations: [ CellContentSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CellContentSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
