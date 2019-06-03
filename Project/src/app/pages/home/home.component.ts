import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {AppGlobals} from "../../app.globals";
import {EventsService} from "../../shared/services/events.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string;
  topCarts = [];
  searchPostsActive = true;
  url = '';
  cycleData = [];

  constructor(private service: DataService, public globals: AppGlobals, private events: EventsService) {
    this.url = this.globals.url;
    events.changeEmitted3$.subscribe(
      data => {
        this.cycleData = data;
        this.searchPostsActive = false;
      });
  }

  ngOnInit() {
    this.service.getRandoms().subscribe((data: any) => {
      this.topCarts = data;
    })
  }
  goToDetails(cart) {
    localStorage.setItem('cart', cart);
    // this.router.navigate(['details'])
  }


}
