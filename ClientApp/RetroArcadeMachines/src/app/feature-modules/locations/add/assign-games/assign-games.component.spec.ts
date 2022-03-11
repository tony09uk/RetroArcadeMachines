import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { of } from 'rxjs';

import { ElementsModule } from '@core/modules/elements/elements.module';
import { FormModule } from '@core/modules/form/form.module';
import { GameOverview } from '@shared/models/game-overview.model';
import { AutocompleteOption } from '@core/modules/form/autocomplete/models/autocomplete-option.model';

import { AssignGamesService } from '../../services/assign-games.service';
import { AssignGamesComponent } from './assign-games.component';

describe('AssignGamesComponent', () => {
  let assignGameServiceSpyObj: jasmine.SpyObj<AssignGamesService>;

  let component: AssignGamesComponent;
  let fixture: ComponentFixture<AssignGamesComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    assignGameServiceSpyObj = jasmine.createSpyObj<AssignGamesService>('GamesService', [
      'getAllGames'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatAutocompleteModule,
        ElementsModule,
        FormModule
      ],
      declarations: [
        AssignGamesComponent
      ]
    }).overrideComponent(AssignGamesComponent,
      {
        set: {
          providers: [
            { provide: AssignGamesService, useValue: assignGameServiceSpyObj }
          ]
        }
      }
    ).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGamesComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    assignGameServiceSpyObj.getAllGames.and.returnValue(of([]));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set the gamesOverviewlist', () => {
      const gameOverviewList = [{ id: '1', developerList: [''], genreList: [''], maxPlayers: 5, title: 'test game' }] as GameOverview[];
      assignGameServiceSpyObj.getAllGames.and.returnValue(of(gameOverviewList));
      const expected = { id: '1', value: 'test game'} as AutocompleteOption;

      fixture.detectChanges();

      expect(component.gameOptions[0]).toEqual(expected);
    });
  });
});
