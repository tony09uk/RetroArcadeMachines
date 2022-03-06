import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GooglePlacesInputComponent } from './google-places-input.component';

xdescribe('GooglePlacesInputComponent', () => {
  let component: GooglePlacesInputComponent;
  let fixture: ComponentFixture<GooglePlacesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GooglePlacesInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GooglePlacesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
