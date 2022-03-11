import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let routerSpyObj: jasmine.SpyObj<Router>;
  let authServiceSpyObj: jasmine.SpyObj<AuthService>;

  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    routerSpyObj = jasmine.createSpyObj<Router>('Router', ['navigate']);
    authServiceSpyObj = jasmine.createSpyObj<AuthService>('AuthService', [
      'signOut'
    ]);

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: Router, useValue: routerSpyObj },
      ],
      declarations: [ LogoutComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call signOut', () => {
    expect(authServiceSpyObj.signOut).toHaveBeenCalled();
  });

  it('should call navigate', () => {
    expect(routerSpyObj.navigate).toHaveBeenCalled();
  });
});
