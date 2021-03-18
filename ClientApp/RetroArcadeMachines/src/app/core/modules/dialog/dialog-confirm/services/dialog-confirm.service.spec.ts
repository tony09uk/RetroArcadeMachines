import { TestBed } from '@angular/core/testing';

import { DialogConfirmService } from './dialog-confirm.service';

describe('DialogConfirmService', () => {
  let service: DialogConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
