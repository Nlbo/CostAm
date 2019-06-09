import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapInfoService} from "../../shared/services/map-info.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  cart: object;
  user: string;
  address;
  data;
  options;
  images;
  constructor(private mapMarkerService: MapInfoService) {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    // @ts-ignore
    this.address = this.cart.mapDetails.address;
    // @ts-ignore
    this.images = this.cart.imgs;
    // @ts-ignore
    this.mapMarkerService.getMarkers(this.cart.announcementType).subscribe((data) => {
      this.data = data;
    })
  }

  ngOnInit() {
    this.gotoTopInit();
    this.options = {
      onUpdate: (event: any) => {
      }
    };
  }

  ngOnDestroy(): void {
    localStorage.removeItem('cart');
    localStorage.removeItem('this.markersBnakaran[i]');
  }



  gotoTopInit() {
    window.scroll({
      top: 0,
      left: 0
    });
  }

}
