import { TestBed } from '@angular/core/testing';

import { RoapmapService } from './roapmap.service';

describe('RoapmapService', () => {
  let service: RoapmapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoapmapService);
  });
});
