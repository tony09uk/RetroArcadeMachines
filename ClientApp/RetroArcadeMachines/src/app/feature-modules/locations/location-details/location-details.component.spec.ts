import { ViewportScroller } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { Address } from '../models/address.model';
import { LocationDetails } from '../models/location-details.model';

import { LocationDetailsService } from '../services/location-details.service';
import { LocationDetailsComponent } from './location-details.component';

describe('LocationDetailsComponent', () => {
  let locationDetailsServiceSpy: jasmine.SpyObj<LocationDetailsService>;
  let viewportScrollerSpyObj: jasmine.SpyObj<ViewportScroller>;

  let component: LocationDetailsComponent;
  let fixture: ComponentFixture<LocationDetailsComponent>;

  beforeEach(async () => {
    locationDetailsServiceSpy = jasmine.createSpyObj<LocationDetailsService>('LocationDetailsService', [
      'get'
    ]);
    const address = {} as Address;
    const locationDetails = { id: '1', address: address } as LocationDetails;
    locationDetailsServiceSpy.get.and.returnValue(of({} as LocationDetails));

    viewportScrollerSpyObj = jasmine.createSpyObj<ViewportScroller>('ViewportScroller', [
      'setOffset',
      'scrollToAnchor'
    ]);

    const paramMapFake = { paramMap: of({ get: (id: string) => 1 }) };

    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: paramMapFake },
        { provide: ViewportScroller, useValue: viewportScrollerSpyObj }
      ],
      declarations: [LocationDetailsComponent]
    }).overrideComponent(LocationDetailsComponent, {
      set: {
        providers: [
          { provide: LocationDetailsService, useValue: locationDetailsServiceSpy }
        ]
      }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
