import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {HarnessLoader, parallel} from '@angular/cdk/testing';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import {MatIconHarness} from '@angular/material/icon/testing';
import {DomSanitizer} from '@angular/platform-browser';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [
        IconComponent
      ],
    }).compileComponents();
    const registry = TestBed.inject(MatIconRegistry);
    const sanitizer = TestBed.inject(DomSanitizer);

    // `bypassSecurityTrustHtml` used exclusively for testing here.
    registry.addSvgIconLiteralInNamespace(
      'svgIcons',
      'svgIcon',
      sanitizer.bypassSecurityTrustHtml('<svg></svg>'),
    );

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentRef.instance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all icon harnesses', async () => {
    const icons = await loader.getAllHarnesses(MatIconHarness);
    expect(icons.length).toBe(1);
  });

  it('should get whether an icon is inline', async () => {
    const icons = await loader.getAllHarnesses(MatIconHarness);
    const inlineStates = await parallel(() => icons.map(icon => icon.isInline()));
    expect(inlineStates).toEqual([ false ]);
  });
});
