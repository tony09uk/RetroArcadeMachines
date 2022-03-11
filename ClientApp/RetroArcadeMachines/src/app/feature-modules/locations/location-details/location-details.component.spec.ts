import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';

import { LocationDetailsService } from '../services/location-details.service';
import { LocationDetailsComponent } from './location-details.component';

fdescribe('LocationDetailsComponent', () => {
  let viewportScrollerSpyObj: jasmine.SpyObj<ViewportScroller>;
  let component: LocationDetailsComponent;
  let fixture: ComponentFixture<LocationDetailsComponent>;

  beforeEach(async () => {
    viewportScrollerSpyObj = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', [
      'setOffset',
      'scrollToAnchor'
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: { params: of([{id: 1}]) } },
        { provide: ViewportScroller, useValue: viewportScrollerSpyObj }
      ],
      declarations: [LocationDetailsComponent]
    }).overrideComponent(LocationDetailsComponent, {
      set: {
        providers: [
          { provide: LocationDetailsService, useValue: {} }
        ]
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set location details property', () => {

    });

    it('should set location details property', () => {

    });
  });

  describe('formatOpeningHours', () => {

  });

  describe('scrollTo', () => {

  });
});
