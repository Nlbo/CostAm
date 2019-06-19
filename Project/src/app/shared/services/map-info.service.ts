import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MapInfoService {

  private streetForMap = new Subject<any>();
  streetForMapChangeEmitted$ = this.streetForMap.asObservable();

  private cityForMap = new Subject<any>();
  cityForMapChangeEmitted$ = this.cityForMap.asObservable();

  streetForMapEmitChange(change: any) {
    this.streetForMap.next(change);
  }

  cityForMapEmitChange(change: any) {
    this.cityForMap.next(change);
  }



  constructor(private http: HttpClient) {
  }


  getMarkers(item) {
    switch (item) {
      case 'Բնակարան':
        return this.http.get('http://localhost:3000/api/apartments');
        break;
      case 'Առանձնատուն':
        return this.http.get('http://localhost:3000/api/houses');
        break;
      case 'Կոմերցիոն':
        return this.http.get('http://localhost:3000/api/commercials');
        break;
      case 'Հողամաս':
        return this.http.get('http://localhost:3000/api/lands');
        break;
      case 'Բիզնես':
        return this.http.get('http://localhost:3000/api/businesses');
        break;
      case 'Նորակառույց':
        return this.http.get('http://localhost:3000/api/newlyBuilds');
        break;
    }
  }
}
