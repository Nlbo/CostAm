import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class AppGlobals {
  port = '3000';
  protocol = 'http';
  hostname = 'localhost';
  url = this.protocol + '://' + this.hostname + ':' + this.port;
  // url = window.location.origin;
  constructor(){}
}
