import {Component, Input, OnInit} from '@angular/core';
import {MapInfoService} from '../../shared/services/map-info.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

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
  user: string;

  constructor(private mapInfoService: MapInfoService) {
  }


  getMarkers(item) {
    this.otherMarkers = [];
    this.otherMarkersLat = [];
    this.otherMarkersLng = [];
    this.markersHoxamas = null;
    this.mapInfoService.getMarkers(item).subscribe((data: any[]) => {
      this.markersHoxamas = data;
      for (let i = 1; i < data.length; i++) {
        this.otherMarkersLat.push(parseFloat(data[i].mapDetails.lat));
        this.otherMarkersLng.push(parseFloat(data[i].mapDetails.lng));
      }
      this.initMap(data[0].mapDetails);
    });
  };

  ngOnInit() {
    this.mapInfoService.getMarkers('Բնակարան').subscribe((data: any[]) => {
      this.markersHoxamas = data;
      for (let i = 1; i < data.length; i++) {
          this.otherMarkersLat.push(parseFloat(data[i].mapDetails.lat));
          this.otherMarkersLng.push(parseFloat(data[i].mapDetails.lng));
      }
      this.initMap(data[0].mapDetails);
    });
  }

  initMap(mapDetails) {
    const opt = {
      center: {lat: +mapDetails.lat, lng: +mapDetails.lng},
      zoom: 17,
      gestureHandling: 'cooperative'
    };


    this.myMap = new google.maps.Map(document.getElementById('map'), opt);
    const searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));

    this.mainMarker = new google.maps.Marker({
      position: {lat: +mapDetails.lat, lng: +mapDetails.lng},
      map: this.myMap
    });

    for (let i = 0; i < this.otherMarkersLat.length; i++) {
      this.otherMarkers = new google.maps.Marker({
        position: {lat: +this.otherMarkersLat[i], lng: +this.otherMarkersLng[i]},
        map: this.myMap,
        icon: '../../assets/marker-icons/iconYellow40.png'
      });
    }
  }
}
