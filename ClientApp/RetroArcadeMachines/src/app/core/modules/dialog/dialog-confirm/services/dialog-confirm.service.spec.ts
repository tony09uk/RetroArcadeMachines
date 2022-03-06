import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';

import { DialogConfirmService } from './dialog-confirm.service';

// todo: unit test for this service
xdescribe('DialogConfirmService', () => {
  let service: DialogConfirmService;

  beforeEach(() => {
    let matDialogMock = jasmine.createSpyObj<MatDialog>(['open']);
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: {}}
      ]
    });
    service = TestBed.inject(DialogConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call open on the DialogConfirmComponent', () => {

  });

  it('should call close on the DialogConfirmComponent', () => {

  });
});
