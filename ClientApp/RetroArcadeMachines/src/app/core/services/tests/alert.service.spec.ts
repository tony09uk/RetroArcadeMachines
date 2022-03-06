import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertService } from '../alert.service';

describe('AlertService', () => {
    const snackbarMock = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', ['open']);
    let sut: AlertService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatSnackBarModule
            ],
            providers: [
                AlertService,
                { provide: MatSnackBar, useValue: snackbarMock }
            ]
        });

        sut = TestBed.inject(AlertService);
    });
    it('should open success snackbar with expected parameters', () => {
        const message = 'success message';
        sut.success(message);
        expect(snackbarMock.open).toHaveBeenCalledWith(
            message,
            'Dismiss',
            Object({
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: [ 'bg-success' ]
            }) );
    });

    it('should open error snackbar with expected parameters', () => {
        const message = 'error message';
        sut.error(message);
        expect(snackbarMock.open).toHaveBeenCalledWith(
            message,
            'Dismiss',
            Object({
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: [ 'bg-error' ]
            }) );
    });

    it('should open info snackbar with expected parameters', () => {
        const message = 'info message';
        sut.info(message);
        expect(snackbarMock.open).toHaveBeenCalledWith(
            message,
            'Dismiss',
            Object({
                duration: 4000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: [ 'bg-accent' ]
            }) );
    });

});
