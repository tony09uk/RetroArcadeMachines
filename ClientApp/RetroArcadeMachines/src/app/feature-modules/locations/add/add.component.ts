import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from '@core/services/alert.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddService } from '../services/add.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  providers: [AddService]
})
export class AddComponent implements OnInit {

  @ViewChild('googleMap', { static: false }) public googleMap: google.maps.Map;

  private _defaultLat = 52.96356075;
  private _defaultLng = -1.309850663231925;

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

  constructor(private _addService: AddService) { }

  ngOnInit(): void {
    this.center = {
      lat: this._defaultLat,
      lng: this._defaultLng
    };

    this.updateMarker(this.center.lat, this.center.lng);

    // todo: create location creation wizard (core/modules/elements)
    // todo: use https://material.angular.io/components/stepper/examples
    // todo: and https://codesandbox.io/embed/github/googlemaps/js-samples/tree/sample-places-autocomplete-addressform
    // todo: as the address form with the map to the right
    // todo: step 1 -> address
    // todo: step 2 -> games
    // todo: step 3 -> (optional) additional info
    // todo: add use my location button to step 1
  }

  handleAddressChange(address: Address): void {
    if (address && address.geometry && address.geometry.location) {
      this.center = {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      };
      this.updateMarker(this.center.lat, this.center.lng);
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
