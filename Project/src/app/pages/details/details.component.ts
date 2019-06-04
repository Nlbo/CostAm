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
  }

  ngOnDestroy(): void {
    localStorage.removeItem('cart')
  }

}
