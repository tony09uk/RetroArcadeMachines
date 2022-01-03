import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGamesComponent } from './assign-games.component';

describe('AssignGamesComponent', () => {
  let component: AssignGamesComponent;
  let fixture: ComponentFixture<AssignGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
