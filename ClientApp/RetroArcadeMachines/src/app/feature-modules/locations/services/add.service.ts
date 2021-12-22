import { Injectable } from '@angular/core';

import { HttpService } from '@core/services/http.service';
import { Observable } from 'rxjs';

@Injectable()
export class AddService {
    constructor(private _httpService: HttpService) { }
}
