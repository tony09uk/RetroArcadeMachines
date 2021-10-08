import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { GameOverview } from 'src/app/shared/models/game-overview.model';
import { DaysOfTheWeek } from '../models/days-of-the-week.enum';
import { LocationDetails } from '../models/location-details.model';
import { LocationDetailsService } from '../services/location-details.service';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  providers: [LocationDetailsService]
})
export class LocationDetailsComponent implements OnInit {

  images = [
    {path: 'https://via.placeholder.com/1142x440'},
    {path: 'https://via.placeholder.com/1142x440'}
  ];
  locationsDetails: LocationDetails;
  DaysOfTheWeek = DaysOfTheWeek;

  constructor(
    private _viewportScroller: ViewportScroller,
    private _locationDetailsService: LocationDetailsService,
    private _activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this._activatedroute
      .paramMap
      .pipe(
        switchMap(params => this._locationDetailsService.get(params.get('id')))
      )
      .subscribe(
        (details) => { this.locationsDetails = details; }
      );
    this._viewportScroller.setOffset([0, 100]);
  }

  formatOpeningHours(open: string, closed: string): string {
    if (!open && !closed) {
      return 'Closed';
    }
    return open + '-' + closed;
  }

  scrollTo(elementId: string): boolean {
    this._viewportScroller.scrollToAnchor(elementId);
    return false;
  }

  onRowClick(event: GameOverview): void {
    // navigate to game details
  }
}
