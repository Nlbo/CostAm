import {Component, OnDestroy, OnInit} from '@angular/core';
import {MapInfoService} from "../../shared/services/map-info.service";
import {PublicDataService} from "../../shared/services/public-data.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  cart: any;
  user: string;
  address;
  data;
  options;
  images;
  constructor(private mapMarkerService: MapInfoService,  public publicData: PublicDataService) {
    this.cart = JSON.parse(localStorage.getItem('cart'));

    let data = []
      .concat(this.cart.prices.filter(item => item.type === 'Վաճառք'))
      .concat(this.cart.prices.filter(item => item.type === 'Վարձակալություն'))
      .concat(this.cart.prices.filter(item => item.type === 'Օրավարձով'));

    console.log(data);
    this.cart.prices = data;


    // @ts-ignore
    this.address = this.cart.mapDetails.address;
    // @ts-ignore
    this.images = this.cart.imgs;
    // @ts-ignore
    this.mapMarkerService.getMarkers(this.cart.announcementType).subscribe((data) => {
     // console.log('###################');
    //  console.time('t1');
      this.data = data;
     // console.timeEnd('t1');
     // console.log('###################');
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
