import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { take } from 'rxjs/internal/operators/take';

import { GridConfig } from '@core/modules/grid/models/grid-config.model';

import { RoadmapResponse } from '../models/roadmap-response';
import { RoapmapService } from '../services/roapmap.service';

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.scss'],
  providers: [ RoapmapService ]
})
export class RoadmapComponent implements OnInit {

  table: GridConfig<RoadmapResponse>;

  constructor(private _roadmapService: RoapmapService) { }

  ngOnInit(): void {
    this._roadmapService
      .get()
      .pipe(
        take(1),
      ).subscribe(
        (response: GridConfig<RoadmapResponse>) => { this.table = response; },
        (error: HttpErrorResponse) => { console.log(error); }
      );
  }
}
