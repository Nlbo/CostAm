import {Component, OnInit} from '@angular/core';
import {DataService} from '../../shared/services/data.service';
import {AppGlobals} from '../../app.globals';
import {EventsService} from '../../shared/services/events.service';
import {Router} from '@angular/router';
import {PublicDataService} from '../../shared/services/public-data.service';

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
  p = 1;

  flage1 = true;
  flage2 = false;
  flage3 = false;
  flage4 = false;
  flage5 = false;
  flage6 = false;
  flage7 = false;

  constructor(private service: DataService, public globals: AppGlobals, private events: EventsService, private router: Router, private publicData: PublicDataService) {
    this.url = this.globals.url;
    events.changeEmitted3$.subscribe(
      data => {

        console.clear();
        console.log(data);
       // console.log(data);
        if (data.data && data.filters) {
          let data2;

          data2 = data.data
            .filter(items => items.prices
              .filter(item => +item.price ? +data.filters.pricesStart <= +item.price && +data.filters.pricesEnd >= +item.price && data.filters.transactions.indexOf(item.type) !== -1 && data.filters.currency.indexOf(item.currency) !== -1 : item.price === 'Պայմ').length > 0);
          data.filters.areaValue ? data2 = data2.filter(items => items.areaValue >= data.filters.areaValue.min && items.areaValue <= data.filters.areaValue.max) : null;
          data.filters.landArea ? data2 = data2.filter(items => items.landArea >= data.filters.landArea.min && items.landArea <= data.filters.landArea.max) : null;
          data.filters.livingSpace ? data2 = data2.filter(items => items.livingSpace >= data.filters.livingSpace.min && items.livingSpace <= data.filters.livingSpace.max) : null;
          data.filters.buildingArea ? data2 = data2.filter(items => items.buildingArea >= data.filters.buildingArea.min && items.buildingArea <= data.filters.buildingArea.max) : null;
          this.cycleData = data2.reverse()
          this.searchPostsActive = false;

        }
        console.log(this.cycleData);
      });


  }


  ngOnInit() {
    if (localStorage.getItem('search')) {
      this.cycleData = JSON.parse(localStorage.getItem('search'));
      this.searchPostsActive = false;
    }
    this.service.getRandoms(this.publicData.randomSumArray()).subscribe((data: any) => {
      this.topCarts = data;
    });

    // popup start
    var wrap:any = window.document.getElementById('popup_overlay');
    var closeButton = window.document.getElementById('popup_close');
    closeButton.onclick = popupClose;

    var timeOUT, timeIN;

    function popup(){
      wrap.style.display = 'block';
      popupIn(1);
    }


    function popupClose(){
      popupOut(0);
    }

    function popupIn(x){
      var op = (wrap.style.opacity) ?  parseFloat(wrap.style.opacity) : 0;

      if(op < x){
        clearInterval(timeOUT);
        op += 0.05;
        wrap.style.opacity = op;
        timeIN = setTimeout(function(){
          popupIn(x);
        }, 50)
      }
    }

    function popupOut(x){
      var op = (wrap.style.opacity) ?  parseFloat(wrap.style.opacity) : 0;
      if(op > x){
        clearInterval(timeIN);
        op -= 0.05;
        wrap.style.opacity = op;
        timeOUT = setTimeout(function(){
          popupOut(x);
        }, 50)
      }
      if(wrap.style.opacity == x){
        wrap.style.display = 'none';
      }
    }



    setTimeout(popup, 500);
    // popup end
  }


  // slick start+++++++++++++++++++++++++++++
  slides = [
    {img: "../assets/images/1.jpg"},
    {img: "../assets/images/2.jpg"},
    {img: "../assets/images/3.jpg"},
    {img: "../assets/images/4.jpg"},
    {img: "../assets/images/5.jpg"},
    {img: "../assets/images/6.jpg"},
    {img: "../assets/images/7.jpg"},
    {img: "../assets/images/8.jpg"},
    {img: "../assets/images/9.jpg"},
    {img: "../assets/images/10.jpg"},
    {img: "../assets/images/11.jpg"},
    {img: "../assets/images/12.jpg"}
  ];
  slideConfig = {
    "slidesToShow": 5,
    "slidesToScroll": 2,
    "nextArrow":"<div class='nav-btn next-slide'></div>",
    "prevArrow":"<div class='nav-btn prev-slide'></div>",
    "dots":true,
    "infinite": false,
    responsive: [{
      breakpoint: 1558,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    },
      {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }]
  };

  // addSlide() {
  //   this.slides.push({img: "http://placehold.it/350x150/777777"})
  // }
  //
  // removeSlide() {
  //   this.slides.length = this.slides.length - 1;
  // }

  // slickInit(e) {
  //   console.log('slick initialized');
  // }
  //
  // breakpoint(e) {
  //   console.log('breakpoint');
  // }
  //
  // afterChange(e) {
  //   console.log('afterChange');
  // }
  //
  // beforeChange(e) {
  //   console.log('beforeChange');
  // }
  // slick end+++++++++++++++++++++++++++++++++

  goToDetails(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('carts', JSON.stringify(this.cycleData));
    window.open(window.location.origin + '/details', '_blank');
    // this.router.navigate(['details'])

    // change route href++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }

  goToOpenMarket() {
    window.open(window.location.origin + '/openMarket', '_blank');
  }
  goToEvaluation() {
    window.open(window.location.origin + '/evaluation', '_blank');
  }

  ngswitch(item) {
    // let candidate0 = JSON.stringify(item);
    // localStorage.setItem('item', candidate0);
    switch (item) {
      case 'Բնակարան':
        // this.publicData.couunt__ = 'Բնակարան';
        // this.couunt__ = 'Բնակարան';
        this.flage1 = true;
        this.flage2 = false;
        this.flage3 = false;
        this.flage4 = false;
        this.flage5 = false;
        this.flage6 = false;
        this.flage7 = false;
        break;
      case 'Առանձնատուն':
        // this.publicData.couunt__ = 'Առանձնատուն';
        // this.couunt__ = 'Առանձնատուն';
        this.flage1 = false;
        this.flage2 = true;
        this.flage3 = false;
        this.flage4 = false;
        this.flage5 = false;
        this.flage6 = false;
        this.flage7 = false;
        break;
      case 'Կոմերցիոն':
        // this.publicData.couunt__ = 'Կոմերցիոն';
        // this.couunt__ = 'Կոմերցիոն';
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = true;
        this.flage4 = false;
        this.flage5 = false;
        this.flage6 = false;
        this.flage7 = false;
        break;
      case 'Հողամաս':
        // this.publicData.couunt__ = 'Հողամաս';
        // this.couunt__ = 'Հողամաս';
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = false;
        this.flage4 = true;
        this.flage5 = false;
        this.flage6 = false;
        this.flage7 = false;
        break;
      case 'Բիզնես':
        // this.publicData.couunt__ = 'Բիզնես';
        // this.couunt__ = 'Բիզնես';
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = false;
        this.flage4 = false;
        this.flage5 = true;
        this.flage6 = false;
        this.flage7 = false;
        break;
      case 'Կոդ':
        // this.publicData.couunt__ = 'Կոդ';
        // this.couunt__ = 'Կոդ';
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = false;
        this.flage4 = false;
        this.flage5 = false;
        this.flage6 = true;
        this.flage7 = false;
        break;
      case 'Նորակառույց':
        // this.publicData.couunt__ = 'Նորակառույց';
        // this.couunt__ = 'Նորակառույց';
        this.flage1 = false;
        this.flage2 = false;
        this.flage3 = false;
        this.flage4 = false;
        this.flage5 = false;
        this.flage6 = false;
        this.flage7 = true;
        break;
    }

  }
}
