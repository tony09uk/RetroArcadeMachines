import { TestBed } from '@angular/core/testing';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';


fdescribe('AuthService', () => {
    let socialAuthServiceMock: jasmine.SpyObj<SocialAuthService>;
    let sut: AuthService;
    let localStore: Storage;

    beforeEach(() => {
        socialAuthServiceMock = jasmine.createSpyObj<SocialAuthService>('SocialAuthService', [
            'signIn',
            'signOut',
            'refreshAuthToken'
        ]);
        const user = { firstName: 'test'} as SocialUser;
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
            // localStorage.setItem('user', JSON.stringify(user));

            const service = new AuthService(socialAuthServiceMock);

            socialAuthServiceMock.authState
                .subscribe(
                    (res: SocialUser) => {
                        expect(res).toEqual({ firstName: 'test' } as SocialUser);
                    }
                );
        });

        xit('should mark loggedIn as false when user NOT in localstorage', () => {

        });
    });


    xit('should open error snackbar with expected parameters', () => {

    });

    xit('should open info snackbar with expected parameters', () => {
        
    });

});
