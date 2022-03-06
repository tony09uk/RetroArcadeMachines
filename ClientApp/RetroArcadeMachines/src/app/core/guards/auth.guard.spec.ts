import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
    describe('canActivate', () => {
        const userServiceMock = { isLoggedIn: true };
        const mockSnapshot = jasmine.createSpyObj<RouterStateSnapshot>('RouterStateSnapshot', ['toString']);
        const routerMock = jasmine.createSpyObj<Router>(['navigate']);
        let sut: AuthGuard;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [
                    AuthGuard,
                    { provide: Router, useValue: routerMock },
                    { provide: AuthService, useValue: userServiceMock }
                ]
            });

            sut = TestBed.inject(AuthGuard);
        });

        it('should return true when logged in', () => {
            userServiceMock.isLoggedIn = true;
            const actual = sut.canActivate({ } as ActivatedRouteSnapshot, mockSnapshot);
            expect(actual).toBeTruthy();
        });

        it('should return false when NOT logged in', () => {
            userServiceMock.isLoggedIn = false;
            const actual = sut.canActivate({ } as ActivatedRouteSnapshot, mockSnapshot);
            expect(actual).toBeFalsy();
        });

        it('should call navigate when NOT logged in', () => {
            userServiceMock.isLoggedIn = false;
            sut.canActivate({ } as ActivatedRouteSnapshot, mockSnapshot);
            expect(routerMock.navigate).toHaveBeenCalled();
        });
    });
});
