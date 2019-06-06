import {Component, Input, OnInit} from '@angular/core';
import {MapInfoService} from '../../shared/services/map-info.service';
import {AppGlobals} from "../../app.globals";

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
  btnOrangeMarkerFlag = false;

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
  url;
  selectedMarkerID;

  constructor(private mapInfoService: MapInfoService, private globals: AppGlobals) {
    this.url = this.globals.url + '/uploads/'
  }

  ngOnInit() {
    this.mapInfoService.getMarkers('Բնակարան').subscribe((data) => {
      this.markersBnakaran = data;

      console.log(this.markersBnakaran)
      console.log(this.markersBnakaran[0].imgs[0])

      for (let i = 0; i < this.markersBnakaran.length; i++) {
        this.markersForBnakaranRed.push({
          lat: this.markersBnakaran[i].mapDetails.lat,
          lng: this.markersBnakaran[i].mapDetails.lng
        });
      }
    });

    this.mapInfoService.getMarkers('Առանձնատուն').subscribe((data) => {
      this.markersArandznatun = data;

      for (let i = 0; i < this.markersArandznatun.length; i++) {
        this.markersForArandznatunGreen.push({
          lat: this.markersArandznatun[i].mapDetails.lat,
          lng: this.markersArandznatun[i].mapDetails.lng
        });
      }
    });

    this.mapInfoService.getMarkers('Կոմերցիոն').subscribe((data) => {
      this.markersKomercion = data;

      for (let i = 0; i < this.markersKomercion.length; i++) {
        this.markersForKomercionYellow.push({
          lat: this.markersKomercion[i].mapDetails.lat,
          lng: this.markersKomercion[i].mapDetails.lng
        });
      }
    });

    this.mapInfoService.getMarkers('Հողամաս').subscribe((data) => {
      this.markersHoxamas = data;

      for (let i = 0; i < this.markersHoxamas.length; i++) {
        this.markersForHoxamasBlue.push({
          lat: this.markersHoxamas[i].mapDetails.lat,
          lng: this.markersHoxamas[i].mapDetails.lng
        });
      }
    });

    this.mapInfoService.getMarkers('Բիզնես').subscribe((data) => {
      this.markersBiznes = data;

      for (let i = 0; i < this.markersBiznes.length; i++) {
        this.markersForBiznesPurple.push({
          lat: this.markersBiznes[i].mapDetails.lat,
          lng: this.markersBiznes[i].mapDetails.lng
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
          'href="details">\n' +
          '<img src="' + this.url + this.markersBnakaran[0].imgs[0]+'" style="max-width: 80px;height: 80px;object-fit: cover">\n' +
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
        localStorage.setItem('cart', JSON.stringify(this.markersBnakaran[i]));
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
          'href="details">\n' +
          '<img src="' + this.url + this.markersArandznatun[0].imgs[0]+'" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

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
        localStorage.setItem('cart', JSON.stringify(this.markersArandznatun[i]));
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
          'href="details">\n' +
          '<img src="' + this.url + this.markersKomercion[0].imgs[0]+'" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

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
        localStorage.setItem('cart', JSON.stringify(this.markersKomercion[i]));
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
          'href="details">\n' +

          '<img src="' + this.url + this.markersHoxamas[0].imgs[0]+'" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

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
        localStorage.setItem('cart', JSON.stringify(this.markersHoxamas[i]));
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
          'href="details">\n' +
          '<img src="' + this.url + this.markersBiznes[0].imgs[0]+'" style="max-width: 80px;height: 80px;object-fit: cover">\n' +

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
        localStorage.setItem('cart', JSON.stringify(this.markersBiznes[i]));
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
    this.btnOrangeMarkerFlag = false;
  }

  showGreenMarkers() {
    this.setMapOnAll(null);
    this.setMarkersGreen(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = true;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
  }

  showYellowMarkers() {
    this.setMapOnAll(null);
    this.setMarkersYellow(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = true;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
  }

  showBlueMarkers() {
    this.setMapOnAll(null);
    this.setMarkersBlue(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = true;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = false;
  }

  showPurpleMarkers() {
    this.setMapOnAll(null);
    this.setMarkersPurple(this.myMap);

    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = true;
    this.btnOrangeMarkerFlag = false;
  }

  showOrangeMarkers(){
    this.btnRedMarkerFlag = false;
    this.btnGreenMarkerFlag = false;
    this.btnYellowMarkerFlag = false;
    this.btnBlueMarkerFlag = false;
    this.btnPurpleMarkerFlag = false;
    this.btnOrangeMarkerFlag = true;
  }














  // myMap;
  //
  // markersBnakaran: any;
  // markersArandznatun: any;
  // markersKomercion: any;
  // markersHoxamas: any = [];
  // markersBiznes: any;
  //
  // mainMarker;
  // otherMarkersLat = [];
  // otherMarkersLng = [];
  // otherMarkers;
  // selectedMarkerType = [];
  //
  // selectedType;
  // selectedMarkerID;
  // user: string;
  //
  // constructor(private mapInfoService: MapInfoService) {
  // }
  //
  //
  // getMarkers(item) {
  //   this.otherMarkers = [];
  //   this.otherMarkersLat = [];
  //   this.otherMarkersLng = [];
  //   this.markersHoxamas = null;
  //   this.mapInfoService.getMarkers(item).subscribe((data: any[]) => {
  //     this.markersHoxamas = data;
  //     for (let i = 1; i < data.length; i++) {
  //       this.otherMarkersLat.push(parseFloat(data[i].mapDetails.lat));
  //       this.otherMarkersLng.push(parseFloat(data[i].mapDetails.lng));
  //     }
  //     this.initMap(data[0].mapDetails);
  //   });
  // };
  //
  // ngOnInit() {
  //   this.mapInfoService.getMarkers('Բնակարան').subscribe((data: any[]) => {
  //     this.markersHoxamas = data;
  //     for (let i = 1; i < data.length; i++) {
  //         this.otherMarkersLat.push(parseFloat(data[i].mapDetails.lat));
  //         this.otherMarkersLng.push(parseFloat(data[i].mapDetails.lng));
  //     }
  //     this.initMap(data[0].mapDetails);
  //   });
  // }
  //
  // initMap(mapDetails) {
  //   const opt = {
  //     center: {lat: +mapDetails.lat, lng: +mapDetails.lng},
  //     zoom: 17,
  //     gestureHandling: 'cooperative'
  //   };
  //
  //
  //   this.myMap = new google.maps.Map(document.getElementById('map'), opt);
  //   const searchBox = new google.maps.places.SearchBox(document.getElementById('mapSearch'));
  //
  //   this.mainMarker = new google.maps.Marker({
  //     position: {lat: +mapDetails.lat, lng: +mapDetails.lng},
  //     map: this.myMap
  //   });
  //
  //   for (let i = 0; i < this.otherMarkersLat.length; i++) {
  //     this.otherMarkers = new google.maps.Marker({
  //       position: {lat: +this.otherMarkersLat[i], lng: +this.otherMarkersLng[i]},
  //       map: this.myMap,
  //       icon: '../../assets/marker-icons/iconYellow40.png'
  //     });
  //   }
  // }
}
