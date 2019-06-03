import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  private emitChangeSource2 = new Subject<any>();
  private emitChangeSource3 = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  changeEmitted2$ = this.emitChangeSource2.asObservable();
  changeEmitted3$ = this.emitChangeSource2.asObservable();
  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
  emitChange2(change: any) {
    this.emitChangeSource2.next(change);
  }
  emitChange3(change: any) {
    this.emitChangeSource2.next(change);
  }
}
