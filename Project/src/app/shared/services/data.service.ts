import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppGlobals} from "../../app.globals";

@Injectable({
  providedIn: 'root'
})
export class DataService {
 // url = 'http://localhost:3000';
 url;
  constructor(private http: HttpClient, private globals: AppGlobals) {
    this.url = this.globals.url;
  }
  postData(data, link) {
    return this.http.post(this.url + '/api/' + link, data);
  }
  getRandoms(item) {
    return this.http.post(this.url + '/api/random', item);
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
