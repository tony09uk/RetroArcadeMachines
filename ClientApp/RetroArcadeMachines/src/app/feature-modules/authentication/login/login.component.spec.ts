import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { AuthState } from '@shared/models/auth-state.model';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let routerSpyObj: jasmine.SpyObj<Router>;
  let authServiceSpyObj: jasmine.SpyObj<AuthService>;

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    routerSpyObj = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceSpyObj = jasmine.createSpyObj<AuthService>('AuthService', [
      'signIn',
      'signOut',
      'refreshToken',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: { returnUrl: 'somewhere' } } } },
      ],
      declarations: [
        LoginComponent,
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const authServicePropertySpy = jasmine.createSpy().and.returnValue(true);
    Object.defineProperty(authServiceSpyObj, 'isLoggedIn', { get: authServicePropertySpy });

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should navigate the user away when logged in', () => {
      const authServicePropertySpy = jasmine.createSpy().and.returnValue(true);
      Object.defineProperty(authServiceSpyObj, 'isLoggedIn', { get: authServicePropertySpy });

      fixture.detectChanges();

      expect(routerSpyObj.navigate).toHaveBeenCalled();
    });

    it('should NOT navigate the user away when NOT logged in', () => {
      const authServiceLoggedInSpy = jasmine.createSpy().and.returnValue(false);
      Object.defineProperty(authServiceSpyObj, 'isLoggedIn', { get: authServiceLoggedInSpy });

      const authServiceStateSpy = jasmine.createSpy().and.returnValue(of({ user: { firstName: 'test'}, isLoggedIn: false} as AuthState));
      Object.defineProperty(authServiceSpyObj, 'authState$', { get: authServiceStateSpy });

      fixture.detectChanges();

      expect(routerSpyObj.navigate).not.toHaveBeenCalled();
    });

    it('should set user and logged in state', () => {
      const authServiceLoggedInSpy = jasmine.createSpy().and.returnValue(false);
      Object.defineProperty(authServiceSpyObj, 'isLoggedIn', { get: authServiceLoggedInSpy });

      const authServiceStateSpy = jasmine.createSpy().and.returnValue(of({ user: { firstName: 'test'}, isLoggedIn: false} as AuthState));
      Object.defineProperty(authServiceSpyObj, 'authState$', { get: authServiceStateSpy });

      fixture.detectChanges();

      expect(component.isLoggedIn).toBe(false);
      expect(component.user.firstName).toBe('test');
    });
  });

  describe('signInWithFB', () => {
    it('should call signIn', () => {
      component.signInWithFB();

      expect(authServiceSpyObj.signIn).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should call signOut', () => {
      component.signOut();

      expect(authServiceSpyObj.signOut).toHaveBeenCalled();
    });
  });

  describe('refreshToken', () => {
    it('should call refreshToken', () => {
      component.refreshToken();

      expect(authServiceSpyObj.refreshToken).toHaveBeenCalled();
    });
  });
});
