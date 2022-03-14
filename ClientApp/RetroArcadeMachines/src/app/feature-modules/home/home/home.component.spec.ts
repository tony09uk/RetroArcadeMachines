import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSectionComponent } from '@core/modules/elements/banner-section/banner-section.component';
import { ElementsModule } from '@core/modules/elements/elements.module';
import { AboutComponent } from '../about/about.component';
import { HeroComponent } from '../hero/hero.component';
import { MoreInfoComponent } from '../more-info/more-info.component';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ElementsModule
      ],
      declarations: [
        HomeComponent,
        HeroComponent,
        AboutComponent,
        MoreInfoComponent,
        BannerSectionComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
