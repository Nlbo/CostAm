import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapInfoService {
  selectedAnnouncementType: string;
  selectedMarkerID: number;

  constructor(private http: HttpClient) {
  }



  getMarkersAnnouncementsApartment() {
    return this.http.get('http://localhost:3000/announcementsApartment');
  }

  getMarkersAnnouncementsHouse() {
    return this.http.get('http://localhost:3000/announcementsHouse');
  }

  getMarkersAnnouncementsCommercial() {
    return this.http.get('http://localhost:3000/announcementsCommercial');
  }

  getMarkersAnnouncementsLandArea() {
    return this.http.get('http://localhost:3000/announcementsLandArea');
  }

  getMarkersAnnouncementsBusiness() {
    return this.http.get('http://localhost:3000/announcementsBusiness');
  }
}
