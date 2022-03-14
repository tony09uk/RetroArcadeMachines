import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSectionComponent } from '@core/modules/elements/banner-section/banner-section.component';
import { ElementsModule } from '@core/modules/elements/elements.module';

import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ElementsModule
      ],
      declarations: [
        HeroComponent,
        BannerSectionComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
