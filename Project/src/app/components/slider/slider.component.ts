import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  slides = [
    {img: 'assets/images/livingroom2.jpg'},
    {img: 'assets/images/room3.jpg'},
    {img: 'assets/images/house.jpg'}
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false,
    autoplay: true
  };

  constructor() {
  }

  ngOnInit() {
  }

}
