import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepBaseComponent } from '@core/modules/elements/stepper/step-base/step-base.component';

import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { FindLocationEvent } from '../../models/find-location-event.model';

@Component({
  selector: 'app-find-location',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.scss']
})
export class FindLocationComponent extends StepBaseComponent<FindLocationEvent> implements OnInit {

  @ViewChild('googleMap', { static: false }) public googleMap: google.maps.Map;

  private _defaultLat = 52.96356075;
  private _defaultLng = -1.309850663231925;

  form: FormGroup;

  markers: google.maps.Marker[];
  marker: google.maps.Marker;
  zoom = 17;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 8,
  };

  constructor(private _formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      address: ['']
    });

    this.updateMapCenter(this._defaultLat, this._defaultLng);
    this.updateMarker(this._defaultLat, this._defaultLat);
  }

  handleAddressChange(address: Address): void {
    if (address && address.geometry && address.geometry.location) {
      this.center = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };
      this.updateMarker(this.center.lat, this.center.lng);
      this.events.emit(new FindLocationEvent(address));
    } else {
      console.log('not an address');
      console.log(address);
    }
  }

  usersLocation(geoLocation: GeolocationPosition): void {
    this.updateMapCenter(geoLocation.coords.latitude, geoLocation.coords.longitude);
    this.updateMarker(geoLocation.coords.latitude, geoLocation.coords.longitude);
  }

  private updateMapCenter(latitude: number, longitude: number): void {
    this.center = {
      lat: latitude,
      lng: longitude
    };
  }

  private updateMarker(latitude: number, longitude: number): void {
    const markerPosition = { lat: latitude, lng: longitude };

    this.marker = new google.maps.Marker({
      position: markerPosition,
      map: this.googleMap,
      title: '',
      animation: google.maps.Animation.BOUNCE
    });

    this.marker.getPosition();
  }

}
