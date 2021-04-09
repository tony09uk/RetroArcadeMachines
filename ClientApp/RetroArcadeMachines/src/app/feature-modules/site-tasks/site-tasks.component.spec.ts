import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTasksComponent } from './site-tasks.component';

describe('SiteTasksComponent', () => {
  let component: SiteTasksComponent;
  let fixture: ComponentFixture<SiteTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
