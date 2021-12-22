import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AlertService } from '@core/services/alert.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ComponentRestrictions } from 'ngx-google-places-autocomplete/objects/options/componentRestrictions';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-google-places-input',
  templateUrl: './google-places-input.component.html',
  styleUrls: ['./google-places-input.component.scss']
})
export class GooglePlacesInputComponent implements OnInit {

  @ViewChild('divElement') divElement: ElementRef<HTMLDivElement>;
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  @Output() addressSelected = new EventEmitter<Address>();
  @Output() usersLocationRetrieved = new EventEmitter<GeolocationPosition>();

  // todo: allow user the option of restricting the country search
  options = {
    componentRestrictions: { country: 'UK' } as ComponentRestrictions
  } as Options;

  constructor(private _alertService: AlertService) { }

  ngOnInit(): void {
    this.getUsersLocation(false);
  }

  handleAddressChange(address: Address): void {
    this.addressSelected.emit(address);
  }

  getUsersLocation(includeNearByPlaces: boolean): void {
    navigator.geolocation
      .getCurrentPosition(
        (geoLocation: GeolocationPosition) => { this.getLocationAddress(geoLocation, includeNearByPlaces); },
        () => { this._alertService.info('Location services have been blocked', 'bottom', 'end', 10000); },
        { timeout: 10000 }
      );
  }

  getLocationAddress(geoLocation: GeolocationPosition, includeNearByPlaces: boolean): void {
    this.usersLocationRetrieved.emit(geoLocation);

    // todo: enable button in UI
    // todo: allow user to add their location using the find me feature
    // todo: allowing the above may need a new workflow
    if (includeNearByPlaces) {
      this.getPlaceName(geoLocation.coords.latitude, geoLocation.coords.longitude);
    }
  }

  private getPlaceName(lat: number, lng: number): void {
    const svc = new google.maps.places.PlacesService(this.divElement.nativeElement);
    const loc = { lat, lng } as google.maps.LatLngLiteral;
    const placeSearchRequest = {
      location: loc,
      openNow: false,
      rankBy: google.maps.places.RankBy.DISTANCE,
      type: 'establishment'
    } as google.maps.places.PlaceSearchRequest;

    try {
      svc.nearbySearch(placeSearchRequest, this.nearbyResult);
    } catch (error) {
      console.log('ERROR IN NEARBY SEARCH');
      console.log(error);
    }
  }

  private nearbyResult(results: google.maps.places.PlaceResult[],
    status: google.maps.places.PlacesServiceStatus,
    pagination: google.maps.places.PlaceSearchPagination): void {
    console.log(results);
    console.log(status);
    console.log(pagination);
  }

}
