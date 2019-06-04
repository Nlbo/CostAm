import {Component, OnInit} from '@angular/core';
import {MapInfoService} from '../../shared/services/map-info.service';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  lat = 40.177200;
  lng = 44.503490;
  myMap;

  btnRedMarkerFlag = false;
  btnGreenMarkerFlag = false;
  btnYellowMarkerFlag = false;
  btnBlueMarkerFlag = false;
  btnPurpleMarkerFlag = false;

  markersBnakaran: any = [];
  markersArandznatun: any = [];
  markersKomercion: any = [];
  markersHoxamas: any = [];
  markersBiznes: any = [];
  markersForBnakaranRed = [];
  markersForArandznatunGreen = [];
  markersForKomercionYellow = [];
  markersForHoxamasBlue = [];
  markersForBiznesPurple = [];

  currentinfo = null;
  markersArray = [];

  selectedMarkerID;
  user: string;

  constructor(private mapInfoService: MapInfoService) {
  }

  ngOnInit() {
    this.mapInfoService.getMarkers('Բնակարան').subscribe((data) => {
      this.markersBnakaran = data;

      for (let i = 0; i < this.markersBnakaran.length; i++) {
        this.markersForBnakaranRed.push({
          lat: this.markersBnakaran[i].lat,
          lng: this.markersBnakaran[i].lng
        });
      }
    });
    this.initMap();
  };

  getMarkers(item) {
    this.mapInfoService.getMarkers(item).subscribe((data) => {
      this.markersBnakaran = data;

      for (let i = 0; i < this.markersBnakaran.length; i++) {
        this.markersForBnakaranRed.push({
          lat: this.markersBnakaran[i].lat,
          lng: this.markersBnakaran[i].lng
        });
      }
    });
    this.initMap();
  }

  initMap() {
    const opt = {
      center: {lat: +this.lat, lng: +this.lng},
      zoom: 13,
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
      this.myMap.setZoom(15);
    });
  }

  setMapOnAll(map) {
    for (let i = 0; i < this.markersArray.length; i++) {
      this.markersArray[i].setMap(map);
    }
  }

  setMarkersRed(map) {
    for (let i = 0; i < this.markersForBnakaranRed.length; i++) {
      // this.mapInfoService.selectedType = 'bnakaran';
      // this.mapInfoService.selectedMarkerID = this.markersBnakaran[i].id;
      // this.selectedType = 'bnakaran';
      // this.selectedMarkerID = this.markersBnakaran[i].id;
      //
      // console.log(this.selectedType + ', ' + this.selectedMarkerID);

      const infoWindow = new google.maps.InfoWindow({
        content: '<a style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details-search/' + this.markersBnakaran[i].lat + '?announcementType=' + this.markersBnakaran[i].lat + '"' + '>\n' +
          '<img src="assets/images/1.jpeg" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersBnakaran[i].mapDetails.address +
          '</a>'
      });

      const markersRed = new google.maps.Marker({
        position: {lat: +this.markersForBnakaranRed[i].lat, lng: +this.markersForBnakaranRed[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconRed40.png'
      });

      this.markersArray.push(markersRed);

      google.maps.event.addListener(markersRed, 'click', () => {
        if (this.currentinfo) {
          this.currentinfo.close();
        }

        infoWindow.open(map, markersRed);

        this.currentinfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersGreen(map) {
    for (let i = 0; i < this.markersForArandznatunGreen.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details-search/' + this.markersArandznatun[i].id + '?announcementType=' + this.markersArandznatun[i].announcementType + '"' + '>\n' +
          '<img src="../../../assets/images/2.jpg" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersArandznatun[i].mapDetails.address +
          '</a>'
      });

      const markersGreen = new google.maps.Marker({
        position: {lat: +this.markersForArandznatunGreen[i].lat, lng: +this.markersForArandznatunGreen[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconGreen40.png'
      });

      this.markersArray.push(markersGreen);

      google.maps.event.addListener(markersGreen, 'click', () => {
        if (this.currentinfo) {
          this.currentinfo.close();
        }

        infoWindow.open(map, markersGreen);

        this.currentinfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersYellow(map) {
    for (let i = 0; i < this.markersForKomercionYellow.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details-search/' + this.markersKomercion[i].id + '?announcementType=' + this.markersKomercion[i].announcementType + '"' + '>\n' +
          '<img src="../../../assets/images/3.jpg" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersKomercion[i].mapDetails.address +
          '</a>'
      });

      const markersYellow = new google.maps.Marker({
        position: {lat: +this.markersForKomercionYellow[i].lat, lng: +this.markersForKomercionYellow[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconYellow40.png'
      });
      this.markersArray.push(markersYellow);

      google.maps.event.addListener(markersYellow, 'click', () => {
        if (this.currentinfo) {
          this.currentinfo.close();
        }

        infoWindow.open(map, markersYellow);

        this.currentinfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersBlue(map) {
    for (let i = 0; i < this.markersForHoxamasBlue.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details-search/' + this.markersHoxamas[i].id + '?announcementType=' + this.markersHoxamas[i].announcementType + '"' + '>\n' +

          '<img src="../../../assets/images/4.jpg" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersHoxamas[i].mapDetails.address +
          '</a>'
      });

      const markersBlue = new google.maps.Marker({
        position: {lat: +this.markersForHoxamasBlue[i].lat, lng: +this.markersForHoxamasBlue[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconBlue40.png'
      });
      this.markersArray.push(markersBlue);

      google.maps.event.addListener(markersBlue, 'click', () => {
        if (this.currentinfo) {
          this.currentinfo.close();
        }

        infoWindow.open(map, markersBlue);

        this.currentinfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  setMarkersPurple(map) {
    for (let i = 0; i < this.markersForBiznesPurple.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        content: '<a style="display: flex;flex-direction: column;align-items: center" ' +
          'href="details-search/' + this.markersBiznes[i].id + '?announcementType=' + this.markersBiznes[i].announcementType + '"' + '>\n' +
          '<img src="../../../assets/images/5.jpg" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
          '<br>\n' +
          this.markersBiznes[i].mapDetails.address +
          '</a>'
      });
      //1?announcementType=Բնակարան

      const markersPurple = new google.maps.Marker({
        position: {lat: +this.markersForBiznesPurple[i].lat, lng: +this.markersForBiznesPurple[i].lng},
        map: map,
        icon: '../../assets/marker-icons/iconPurple40.png'
      });
      this.markersArray.push(markersPurple);

      google.maps.event.addListener(markersPurple, 'click', () => {
        if (this.currentinfo) {
          this.currentinfo.close();
        }

        infoWindow.open(map, markersPurple);

        this.currentinfo = infoWindow;
      });

      google.maps.event.addListener(this.myMap, 'click', () => {
        infoWindow.close();
      });
    }
  }

  showRedMarkers() {
    this.setMapOnAll(null);
    this.setMarkersRed(this.myMap);

    this.btnRedMarkerFlag = true;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
  }

  showGreenMarkers() {
    this.setMapOnAll(null);
    this.setMarkersGreen(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = true;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
  }

  showYellowMarkers() {
    this.setMapOnAll(null);
    this.setMarkersYellow(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = true;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
  }

  showBlueMarkers() {
    this.setMapOnAll(null);
    this.setMarkersBlue(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = true;
    this.btnPurpleMarkerFlag = false;
  }

  showPurpleMarkers() {
    this.setMapOnAll(null);
    this.setMarkersPurple(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = true;
  }

}
