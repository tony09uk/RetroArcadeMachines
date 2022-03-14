import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { BannerSectionComponent } from '@core/modules/elements/banner-section/banner-section.component';
import { ElementsModule } from '@core/modules/elements/elements.module';
import { GridConfig } from '@core/modules/grid/models/grid-config.model';
import { GameOverview } from '@shared/models/game-overview.model';

import { GamesOverviewTable } from '../models/games-overview-table.model';
import { GamesService } from '../services/games.service';

import { GamesOverviewComponent } from './games-overview.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-grid',
  template: '',
})
export class FakeGridComponent {
  @Input() gridConfig: any;
  @Output() rowClickedEvent = new EventEmitter<any>();
}

describe('GamesOverviewComponent', () => {
  let gameServiceSpyObj: jasmine.SpyObj<GamesService>;

  let component: GamesOverviewComponent;
  let fixture: ComponentFixture<GamesOverviewComponent>;

  beforeEach(async () => {
    gameServiceSpyObj = jasmine.createSpyObj<GamesService>('GamesService', [
      'get'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ElementsModule,
      ],
      declarations: [
        GamesOverviewComponent,
        BannerSectionComponent,
        FakeGridComponent
      ]
    }).overrideComponent(GamesOverviewComponent,
      {
        set: {
          providers: [
            { provide: GamesService, useValue: gameServiceSpyObj }
          ]
        }
      }
    ).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesOverviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const gridConfig = new GridConfig<GameOverview>();
    gridConfig.tableData = [] as GameOverview[];
    gridConfig.columnHeader = {} as GamesOverviewTable;
    gameServiceSpyObj.get.and.returnValue(of(gridConfig));

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should set table', () => {
    const gridConfig = new GridConfig<GameOverview>();
    gridConfig.tableData = [] as GameOverview[];
    gridConfig.columnHeader = {} as GamesOverviewTable;
    gameServiceSpyObj.get.and.returnValue(of(gridConfig));

    fixture.detectChanges();

    expect(component.table).toBeTruthy();
  });
});
