import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 // url = 'http://localhost:3000';
 url = window.location.origin;
  constructor(private http: HttpClient) { }
  postData(data, link) {
    return this.http.post(this.url + '/api/' + link, data);
  }
  getRandoms() {
    return this.http.get(this.url + '/api/random');
  }

  getFiltredApartmens(data) {
    return this.http.post(this.url + '/api/apartments/filtered', data);
  }

  getFiltredHouses(data) {
    return this.http.post(this.url + '/api/houses/filtered', data);
  }
  getFiltredCommercials(data) {
    return this.http.post(this.url + '/api/commercials/filtered', data);
  }
  getFiltredLands(data) {
    return this.http.post(this.url + '/api/lands/filtered', data);
  }
  getFiltredBusinesses(data) {
    return this.http.post(this.url + '/api/businesses/filtered', data);
  }
  getFiltredNewlyBuilds(data) {
    return this.http.post(this.url + '/api/newlyBuilds/filtered', data);
  }
}
