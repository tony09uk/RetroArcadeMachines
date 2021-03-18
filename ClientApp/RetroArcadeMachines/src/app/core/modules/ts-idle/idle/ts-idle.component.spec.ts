import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsIdleComponent } from './ts-idle.component';

describe('TsIdleComponent', () => {
  let component: TsIdleComponent;
  let fixture: ComponentFixture<TsIdleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TsIdleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TsIdleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
