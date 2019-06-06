import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {AppGlobals} from "../../app.globals";
import {EventsService} from "../../shared/services/events.service";
import {Router} from "@angular/router";

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
  announcementType;

  constructor(private service: DataService, public globals: AppGlobals, private events: EventsService, private router: Router) {
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
    if (localStorage.getItem('search')) {
      this.cycleData = JSON.parse(localStorage.getItem('search'));
      this.searchPostsActive = false;
    }
    this.service.getRandoms().subscribe((data: any) => {
      this.topCarts = data;
    })
  }

  goToDetails(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('carts', JSON.stringify(this.cycleData));
    this.router.navigate(['details'])
  }


}
