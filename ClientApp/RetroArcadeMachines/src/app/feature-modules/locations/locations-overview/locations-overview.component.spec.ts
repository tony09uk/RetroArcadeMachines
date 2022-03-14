import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsOverviewComponent } from './locations-overview.component';

describe('LocationsComponent', () => {
  let component: LocationsOverviewComponent;
  let fixture: ComponentFixture<LocationsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
