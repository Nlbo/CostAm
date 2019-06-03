import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MapInfoService} from '../../../shared/services/map-info.service';

declare var google;

@Component({
  selector: 'app-create-map',
  templateUrl: './create-map.component.html',
  styleUrls: ['./create-map.component.css']
})
export class CreateMapComponent implements OnInit {

  @Output() mapDetails = new EventEmitter();

  lat = 40.177200;
  lng = 44.503490;

  latitude;
  longitude;
  address;
  addressFromModal;

  myMap;
  marker;
  radius;

  markersArray = [];
  radiusArray = [];

  selectedAnnouncementType = 'bnakaran';

  modal;
  inputMapAddress;
  user: string;

  constructor(private mapInfoService: MapInfoService) {
  }

  ngOnInit() {
    this.initMap();

    this.inputMapAddress = document.getElementById('inputMapAddress');

    this.inputMapAddress.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {

        this.submitInfo();

      }
    });

    this.modal = document.getElementById('myModal');

    window.onclick = (event) => {
      if (event.target == this.modal) {
        this.changeModalInfo('1px solid grey', 'black', 'Հասցե : ');

        this.modal.style.display = 'none';
      }
    };
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(map);
      this.radiusArray[i].setMap(map);
    }
  }

  initMap() {

    const opt = {
      center: {lat: this.lat, lng: this.lng},
      zoom: 14,
      gestureHandling: 'cooperative'
    };

    this.myMap = new google.maps.Map(document.getElementById('map'), opt);

    const searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));

    google.maps.event.addListener(searchBox, 'places_changed', () => {
      const places = searchBox.getPlaces();
      const bounds = new google.maps.LatLngBounds();
      let i;
      let place;

      for (i = 0; place = places[i]; i++) {
        bounds.extend(place.geometry.location);
      }

      this.myMap.fitBounds(bounds);
      this.myMap.setZoom(18);
    });

    google.maps.event.addListener(this.myMap, 'click', (event) => {
      this.placeMarker(event.latLng);
    });

    google.maps.event.addListener(this.myMap, 'click', (event) => {
      this.latitude = event.latLng.lat();
      this.longitude = event.latLng.lng();

      this.radius = new google.maps.Circle({
        map: this.myMap,
        radius: 50,
        center: event.latLng,
        fillColor: '#777',
        fillOpacity: 0.1,
        strokeColor: '#AA0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        clickable: false
      });

      this.radiusArray.push(this.radius);

      this.myMap.panTo(new google.maps.LatLng(this.latitude, this.longitude));

      this.addressFromModal = this.address;

      this.modal.style.display = 'block';

      document.getElementById('inputMapAddress').focus();
    });
  }

  placeMarker(location) {
    this.setMapOnAll(null);

    this.marker = new google.maps.Marker({
      position: location,
      map: this.myMap
    });

    this.markersArray.push(this.marker);
  }

  submitInfo() {
    if (this.addressFromModal != undefined && !this.isEmptyOrSpaces(this.addressFromModal)) {
      this.setMapOnAll(null);

      // this.addAnnouncementService.mapDetails.lat = this.latitude;
      // this.addAnnouncementService.mapDetails.lng = this.longitude;
      // this.addAnnouncementService.mapDetails.address = this.addressFromModal;

      let mapDetails = {
        lat: this.latitude,
        lng: this.longitude,
        address: this.addressFromModal
      };

      this.mapDetails.emit(mapDetails);


      this.changeModalInfo('1px solid grey', 'black', 'Հասցե : ');

      this.addressFromModal = '';
      this.address = '';

      this.modal.style.display = 'none';
    } else {
      this.changeModalInfo('1.2px solid red', 'red', '*Հասցե : ');

      // alert('Հասցեն սխալ է');
    }
  }

  closeModal() {
    this.changeModalInfo('1px solid grey', 'black', 'Հասցե : ');

    this.modal.style.display = 'none';
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^\s*$/) !== null;
  }

  changeModalInfo(borderColor, labelColor, labelText) {
    document.getElementById('inputMapAddress').style.border = borderColor;
    document.getElementById('labelMapAddress').style.color = labelColor;
    document.getElementById('labelMapAddress').innerText = labelText;
  }


}
