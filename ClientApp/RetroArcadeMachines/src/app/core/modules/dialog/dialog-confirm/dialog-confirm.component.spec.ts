import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DialogConfirmComponent } from './dialog-confirm.component';
import { HarnessLoader } from '@angular/cdk/testing';

// todo: unit test for this service
xdescribe('DialogConfirmComponent', () => {
  let component: DialogConfirmComponent;
  let fixture: ComponentFixture<DialogConfirmComponent>;
  let loader: HarnessLoader;

  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        imports: [
          MatDialogModule,
          NoopAnimationsModule
        ],
        declarations: [
          DialogConfirmComponent
        ],
      }).compileComponents();
      fixture = TestBed.createComponent(DialogConfirmComponent);
      fixture.detectChanges();
      loader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    }),
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for dialog', async () => {
    const dialogs = await loader.getAllHarnesses(MatDialogHarness);
    expect(dialogs.length).toBe(1);
  });
});
