import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';

import { HttpService } from 'src/app/core/services/http.service';
import { RoadmapResponse } from '../models/roadmap-response';

@Injectable()
export class RoapmapService {

  constructor(private _httpService: HttpService) { }

  get(): Observable<RoadmapResponse[]> {
    return this._httpService
               .get<RoadmapResponse[]>('roadmaps');
  }
}
