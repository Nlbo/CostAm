import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 url = 'http://localhost:3000';
  constructor(private http: HttpClient) { }
  postData(data, link) {
    return this.http.post(this.url + '/api/' + link, data);
  }
}
