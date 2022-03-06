import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';
import { SocialUser } from 'angularx-social-login';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let user: SocialUser;
  let authServiceFake;

  beforeEach(async () => {
    user = {
      name: 'tony',
      photoUrl: 'http://test.com'
    } as SocialUser;

    authServiceFake = {
      authState$: of({ isLoggedIn: true, user: user } ),
      isLoggedIn: true,
      user: user
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceFake }
      ],
      declarations: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isLogged based on the value returned from authService', () => {
      expect(component.isLoggedIn).toEqual(true);
    });

    it('should set username when logged in is true', () => {
      expect(component.name).toEqual('tony');
    });

    it('should set photourl when logged in is true', () => {
      expect(component.imageUrl).toEqual('http://test.com');
    });
  });
});
