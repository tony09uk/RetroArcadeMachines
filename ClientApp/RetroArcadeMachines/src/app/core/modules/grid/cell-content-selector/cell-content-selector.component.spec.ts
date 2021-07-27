import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CellContentSelectorComponent } from './cell-content-selector.component';

describe('CellContentSelectorComponent', () => {
  let component: CellContentSelectorComponent;
  let fixture: ComponentFixture<CellContentSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
