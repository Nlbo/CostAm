import {Component, Input, OnInit} from '@angular/core';
import {AppGlobals} from "../../app.globals";

@Component({
  selector: 'app-details-slider',
  templateUrl: './details-slider.component.html',
  styleUrls: ['./details-slider.component.css']
})
export class DetailsSliderComponent implements OnInit {

  @Input()images: any[];
  imagesSrcForModal = [];
  imagesSrcForModal2 = [];
  url;
  modal;
  span;

  slideIndex = 1;
  slides;
  dots;


  constructor(private globals: AppGlobals) {
    this.url = this.globals.url + '/uploads/';
   // console.log(this.url);
  }

  ngOnInit() {

    this.images.forEach(item => {
      this.imagesSrcForModal.push({
        source: this.url + item,
        alt: 'Description for Image 1',
        title: 'Title 1'
      });
    });


    for (let i = 0; i < this.imagesSrcForModal.length; i++) {
      this.imagesSrcForModal2.push(this.imagesSrcForModal[i].source);
    }


    this.modal = document.getElementById("myModal");
    this.span = document.getElementsByClassName("close")[0];

    this.span.addEventListener('click', () => {
      this.modal.style.display = "none";
    });

    window.addEventListener('click', (event) => {
      if (event.target == this.modal) {
        this.modal.style.display = "none";
      }
    });

    this.slides = document.getElementsByClassName("mySlides");


  }

  onImageClicked($event: any) {
    this.modal.style.display = "block";
    this.slideIndex = $event.index + 1;
    this.showSlides(this.slideIndex);
  }


// Next/previous controls
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

// Thumbnail image controls
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {

    if (n > this.slides.length) {
      this.slideIndex = 1
    }
    if (n < 1) {
      this.slideIndex = this.slides.length
    }
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }

    this.slides[this.slideIndex - 1].style.display = "block";
  }


}
