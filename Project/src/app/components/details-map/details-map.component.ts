import {Component, Input, OnInit} from '@angular/core';
import {MapInfoService} from "../../shared/services/map-info.service";
import {map} from "rxjs/internal/operators/map";
import {AppGlobals} from "../../app.globals";
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

  currentInfo = null;
  currentInfoAll = null;
  markersArray = [];
  url;

  myPost;
  myPostOther = [];

  myPostAll;

  constructor(private mapInfoService: MapInfoService, private globals: AppGlobals) {
    this.url = this.globals.url + '/uploads/';
  }

  ngOnInit() {

    setTimeout(() => {
      //  console.log(this.data);
      this.markersHoxamas = this.data;
      for (let i = 0; i < this.data.length; i++) {
        this.myPostAll = this.data;
        if (this.data[i].mapDetails.address == this.address) {
          this.lat = parseFloat(this.data[i].mapDetails.lat);
          this.lng = parseFloat(this.data[i].mapDetails.lng);
          this.myPost = this.data[i];
        } else {
          this.otherMarkersLat.push(parseFloat(this.data[i].mapDetails.lat));
          this.otherMarkersLng.push(parseFloat(this.data[i].mapDetails.lng));
          this.myPostOther.push(this.data[i]) ;
        }
      }
      this.initMap();
    }, 4000);
  }

  initMap() {
    const opt = {
      center: {lat: +this.lat, lng: +this.lng},
      zoom: 17,
      gestureHandling: 'cooperative',
    };

    this.myMap = new google.maps.Map(document.getElementById('map'), opt);

    this.mainMarker = new google.maps.Marker({
      position: {lat: +this.lat, lng: +this.lng},
      map: this.myMap
    });

    console.log(this.myPostOther)
    //console.log(this.myPostOther)

    for (let i = 0; i < this.myPostOther.length; i++) {
     // console.log(this.myPostOther[i])
     // console.log(this.myPostOther)
      const infoWindow = new google.maps.InfoWindow({
        content: '<a target="_blank" style="display: flex;flex-direction: column;align-items: center" href="/details">\n' +
          '<img src="' + this.url + this.myPostOther[i].imgs[0] + '" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.myPostOther[i].mapDetails.address +
          '</a>'
      });


      // add


      this.otherMarkers = new google.maps.Marker({
        position: {lat: +this.otherMarkersLat[i], lng: +this.otherMarkersLng[i]},
        map: this.myMap,
        icon: '../../assets/marker-icons/iconYellow40.png'
      });

      google.maps.event.addListener(this.otherMarkers, 'click', () => {
        localStorage.setItem('cart', JSON.stringify(this.myPostOther[i]));
        if (this.currentInfoAll) {
          this.currentInfoAll.close();
        }
        this.otherMarkers = new google.maps.Marker({
          position: {lat: +this.otherMarkersLat[i], lng: +this.otherMarkersLng[i]},
          map: this.myMap,
          icon: '../../assets/marker-icons/iconYellow40.png'
        });
        infoWindow.open(map, this.otherMarkers);

        this.currentInfoAll = infoWindow;
      });

    }

  }
}
