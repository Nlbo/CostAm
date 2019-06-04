import {Component, Input, OnInit} from '@angular/core';
import {MapInfoService} from "../../shared/services/map-info.service";
declare var google;


@Component({
  selector: 'app-details-map',
  templateUrl: './details-map.component.html',
  styleUrls: ['./details-map.component.css']
})
export class DetailsMapComponent implements OnInit {

 @Input() data;
 @Input() address;
  lat;
  lng;
  myMap;

  markersBnakaran: any;
  markersArandznatun: any;
  markersKomercion: any;
  markersHoxamas: any = [];
  markersBiznes: any;

  mainMarker;
  otherMarkersLat = [];
  otherMarkersLng = [];
  otherMarkers;
  selectedMarkerType = [];

  selectedType;
  selectedMarkerID;

  constructor(private mapInfoService: MapInfoService) {
  }

  ngOnInit() {
    setTimeout(() => {

            this.markersHoxamas = this.data;
            for (let i = 0; i < this.data.length; i++) {
              if (this.data[i].address == this.address) {
                this.lat = parseFloat(this.data[i].lat);
                this.lng = parseFloat(this.data[i].lng);
              } else {
                this.otherMarkersLat.push(parseFloat(this.data[i].lat));
                this.otherMarkersLng.push(parseFloat(this.data[i].lng));
              }
            }
            this.initMap();
    }, 400);
  }

  initMap() {
    const opt = {
      center: {lat: +this.lat, lng: +this.lng},
      zoom: 17,
      gestureHandling: 'cooperative'
    };

    this.myMap = new google.maps.Map(document.getElementById('map'), opt);

    this.mainMarker = new google.maps.Marker({
      position: {lat: +this.lat, lng: +this.lng},
      map: this.myMap
    });

    for (let i = 0; i < this.data.length; i++) {
      this.otherMarkers = new google.maps.Marker({
        position: {lat: +this.otherMarkersLat[i], lng: +this.otherMarkersLng[i]},
        map: this.myMap,
        icon: '../../assets/marker-icons/iconYellow40.png'
      });
    }
  }
}
