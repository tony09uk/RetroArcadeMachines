import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  constructor() { }

  days: number;
  hours: number;
  minuets: number;
  seconds: number;

  ngOnInit(): void {
    const arbitaryDate = '2021-08-05';
    interval(1000).pipe(
      map((val: number) => {
        return Date.parse(arbitaryDate) - Date.parse(new Date().toString());
      })
    ).subscribe((diff: number) => {
      this.days = this.getDays(diff);
      this.hours = this.getHours(diff);
      this.minuets = this.getMinutes(diff);
      this.seconds = this.getSeconds(diff);
    });
  }

  private getDays(t: number): number {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  private getHours(t: number): number {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  private getMinutes(t: number): number {
    return Math.floor((t / 1000 / 60) % 60);
  }

  private getSeconds(t: number): number {
    return Math.floor((t / 1000) % 60);
  }
}
