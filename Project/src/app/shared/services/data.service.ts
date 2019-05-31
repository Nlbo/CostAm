import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  postApartments(data) {
    return this.http.post(this.url + '/api/apartments', data);
  }
}
