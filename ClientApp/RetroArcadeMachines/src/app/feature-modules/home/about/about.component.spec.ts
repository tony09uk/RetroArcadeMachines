import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSectionComponent } from '@core/modules/elements/banner-section/banner-section.component';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ElementsModule
      ],
      declarations: [
        AboutComponent,
        BannerSectionComponent
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
