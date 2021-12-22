import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ConfigService } from '@core/services/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RetroArcadeMachines';

  constructor(
    private _configService: ConfigService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document) { }

    ngOnInit(): void {
      // todo: add this only on add.component page load
      const script = this._renderer2.createElement('script');
      const key = this._configService.google_places_api_key;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&language=en`;

      this._renderer2.appendChild(this._document.body, script);
    }
}
