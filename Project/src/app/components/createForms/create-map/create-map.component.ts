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

  myMap;
  marker;
  radius;

  radiusArray = [];

  user: string;

  cityForMap;
  streetForMap;
  mapSearchInput;
  addressToServer;

  markers = [];

  constructor(private mapInfoService: MapInfoService) {
  }

  ngOnInit() {
    this.initMap();

    this.mapSearchInput = document.getElementById('mapSearch');

    this.mapInfoService.cityForMapChangeEmitted$.subscribe((data) => {
      this.cityForMap = data;

     // console.log(data);

      if (this.cityForMap == 'Երևան') {
        this.mapInfoService.streetForMapChangeEmitted$.subscribe((data) => {
          this.streetForMap = data;

          this.address = this.streetForMap;

          this.addressToServer = this.streetForMap;

        //  console.log(this.addressToServer);

          setTimeout(() => {
            google.maps.event.trigger(this.mapSearchInput, 'focus', {});
            google.maps.event.trigger(this.mapSearchInput, 'keydown', {keyCode: 13});
          });
        });
      } else {
        this.address = this.cityForMap;

        this.addressToServer = this.cityForMap;

        setTimeout(() => {
          google.maps.event.trigger(this.mapSearchInput, 'focus', {});
          google.maps.event.trigger(this.mapSearchInput, 'keydown', {keyCode: 13});
        });
      }
    });
  }

  clearMap(){
    this.initMap();
    this.address = '';
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

      if (places.length == 0) {
        return;
      }

      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      const bounds = new google.maps.LatLngBounds();

      this.radiusArray.forEach((radius) => {
        radius.setMap(null);
      });
      this.radiusArray = [];

      places.forEach((place) => {
        if (!place.geometry) {
          console.log('Returned place contains no geometry');
          return;
        }

        // const icon = {
        //   // url: place.icon,
        //   size: new google.maps.Size(71, 71),
        //   origin: new google.maps.Point(0, 0),
        //   anchor: new google.maps.Point(17, 34),
        //   scaledSize: new google.maps.Size(25, 25)
        // };

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();

        this.radius = new google.maps.Circle({
          map: this.myMap,
          radius: 50,
          center: place.geometry.location,
          fillColor: '#777',
          fillOpacity: 0.1,
          strokeColor: '#AA0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          clickable: false
        });
        this.radiusArray.push(this.radius);

        this.marker = new google.maps.Marker({
          map: this.myMap,
          draggable: true,
          // icon: {},
          animation: google.maps.Animation.DROP,
          // title: place.name,
          position: place.geometry.location
        });
        this.radius.bindTo('center', this.marker, 'position');
        this.markers.push(this.marker);

        google.maps.event.addListener(this.marker, 'dragend', () => {
          this.myMap.setCenter(this.marker.position);

          const mapDetails = {
            lat: this.marker.getPosition().lat(),
            lng: this.marker.getPosition().lng(),
            address: this.addressToServer
            // address: this.address
          };

          this.mapDetails.emit(mapDetails);

          // console.log(mapDetails);
        });

        // google.maps.event.addListener(this.myMap, 'dragend', () => {
        //   this.marker.setPosition(this.myMap.getCenter());
        // });

        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        this.myMap.panTo(new google.maps.LatLng(this.latitude, this.longitude));

        const mapDetails = {
          lat: this.latitude,
          lng: this.longitude,
          address: this.addressToServer
          // address: this.address
        };

        this.mapDetails.emit(mapDetails);

        // console.log(mapDetails);
      });
      //this.myMap.fitBounds(bounds);
      this.myMap.setZoom(17);
    });

    google.maps.event.addListener(this.myMap, 'click', (event) => {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
      this.markers = [];

      this.radiusArray.forEach((radius) => {
        radius.setMap(null);
      });
      this.radiusArray = [];

      this.placeMarker(event.latLng);

      this.myMap.panTo(event.latLng);
      this.myMap.setZoom(18);
    });
  }

  placeMarker(location) {
    this.radius = new google.maps.Circle({
      map: this.myMap,
      radius: 50,
      center: location,
      fillColor: '#777',
      fillOpacity: 0.1,
      strokeColor: '#AA0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      clickable: false
    });
    this.radiusArray.push(this.radius);

    this.marker = new google.maps.Marker({
      position: location,
      draggable: true,
      animation: google.maps.Animation.DROP,
      map: this.myMap
    });
    this.radius.bindTo('center', this.marker, 'position');
    this.markers.push(this.marker);

    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.myMap.setCenter(this.marker.position);

      const mapDetails = {
        lat: this.marker.getPosition().lat(),
        lng: this.marker.getPosition().lng(),
        address: this.addressToServer
        // address: this.address
      };

      this.mapDetails.emit(mapDetails);

      // console.log(mapDetails);
    });

    // google.maps.event.addListener(this.myMap, 'dragend', () => {
    //   this.marker.setPosition(this.myMap.getCenter());
    // });

    const mapDetails = {
      lat: this.marker.getPosition().lat(),
      lng: this.marker.getPosition().lng(),
      address: this.addressToServer
      // address: this.address
    };

    this.mapDetails.emit(mapDetails);

    // console.log(mapDetails);
  }
}
