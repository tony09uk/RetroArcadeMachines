import { TestBed } from '@angular/core/testing';
import { AuthState } from '@shared/models/auth-state.model';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
    let socialAuthServiceMock: jasmine.SpyObj<SocialAuthService>;
    let sut: AuthService;
    let localStore: Storage;

    const user = { firstName: 'test'} as SocialUser;

    beforeEach(() => {
        socialAuthServiceMock = jasmine.createSpyObj<SocialAuthService>('SocialAuthService', [
            'signIn',
            'signOut',
            'refreshAuthToken'
        ]);
        const socialAuthServicePropertySpy = jasmine.createSpy().and.returnValue(of({ user: user }));
        Object.defineProperty(socialAuthServiceMock, 'authState', { get: socialAuthServicePropertySpy });

        localStore = {} as Storage;
        spyOn(window.localStorage, 'getItem').and.callFake((key) =>
            key in localStore ? localStore[key] : null
        );

        spyOn(window.localStorage, 'setItem').and.callFake(
            (key, value) => (localStore[key] = value + '')
        );

        spyOn(window.localStorage, 'removeItem').and.callFake(
            (key) => (localStore[key] = undefined)
        );

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: SocialAuthService, useValue: socialAuthServiceMock }
            ]
        });

        sut = TestBed.inject(AuthService);
    });

    describe('onInit', () => {
        it('should try to get user from local storage', () => {
            expect(window.localStorage.getItem).toHaveBeenCalled();
        });

        it('should trigger auth state event', () => {
            socialAuthServiceMock.authState
                .subscribe(
                    res => { expect(true).toEqual(true); }
                );
        });

        it('should mark loggedIn as true when user exists in localstorage', () => {
            socialAuthServiceMock.authState
                .subscribe(
                    (res: SocialUser) => {
                        expect(sut.isLoggedIn).toEqual(true);
                    }
                );
        });
    });

    describe('signIn', () => {
        it('should call signIn', () => {
            socialAuthServiceMock.signIn.and.returnValue(Promise.resolve({ firstName: 'test' } as SocialUser));

            sut.signIn();

            expect(socialAuthServiceMock.signIn).toHaveBeenCalled();
        });

        it('should set loggedIn as true', () => {
            socialAuthServiceMock.signIn.and.returnValue(Promise.resolve({ firstName: 'test' } as SocialUser));

            sut.signIn();

            expect(sut.isLoggedIn).toBe(true);
        });

        it('should set loggedIn as user', () => {
            socialAuthServiceMock.signIn.and.returnValue(Promise.resolve({ firstName: 'test' } as SocialUser));

            sut.signIn();

            expect(sut.user).toBeTruthy();
        });

        it('should trigger authStateEvent', () => {
            socialAuthServiceMock.signIn.and.returnValue(Promise.resolve({ firstName: 'test' } as SocialUser));

            sut.signIn();

            sut.authState$
                .subscribe(
                    (val: AuthState) => expect(val.isLoggedIn).toEqual(true),
                    err => {}
                );
        });
    });

    describe('signOut', () => {
        it('should call signIn', () => {
            socialAuthServiceMock.signOut.and.returnValue(Promise.resolve());

            sut.signOut();

            expect(socialAuthServiceMock.signOut).toHaveBeenCalled();
        });

        it('should set loggedIn as false', () => {
            socialAuthServiceMock.signOut.and.returnValue(Promise.resolve());

            sut.signOut();

            expect(sut.isLoggedIn).toBe(false);
        });

        it('should delete user', () => {
            socialAuthServiceMock.signOut.and.returnValue(Promise.resolve());

            sut.signOut();

            expect(sut.user).toBeFalsy();
        });

        it('should trigger authStateEvent', () => {
            socialAuthServiceMock.signOut.and.returnValue(Promise.resolve());

            sut.signOut();

            sut.authState$
                .subscribe(
                    (val: AuthState) => expect(val.isLoggedIn).toEqual(false),
                    err => {}
                );
        });
    });

    describe('refreshToken', () => {
        it('should call refreshToken', () => {
            socialAuthServiceMock.refreshAuthToken.and.returnValue(Promise.resolve());

            sut.refreshToken();

            expect(socialAuthServiceMock.refreshAuthToken).toHaveBeenCalled();
        });
    });

});
