import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicDataService} from "../../../shared/services/public-data.service";
import {Router} from '@angular/router';

@Component({
  selector: 'app-businesses',
  templateUrl: './businesses.component.html',
  styleUrls: ['./businesses.component.css']
})
export class BusinessesComponent implements OnInit {

  searchFlage = false;


  form: FormGroup;
  user: string;
  cities: object[];
  communities: object[];
  streets: object[];

  constructor(public optionsData: PublicDataService, private router: Router) {

    this.form = new FormGroup({
      transactions: new FormControl([], [Validators.required]),
      regions: new FormControl([], [Validators.required]),
      cities: new FormControl([], [Validators.required]),
      communities: new FormControl([], [Validators.required]),
      streets: new FormControl([], [Validators.required]),
      sectorsBusiness: new FormControl([], [Validators.required]),
      pricesStart: new FormControl('', [Validators.required]),
      pricesEnd: new FormControl('', [Validators.required]),
      currencyForSale: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  onChange(item) {
    switch (item) {
      case 'region': {
        this.cities = [];
        this.communities = [];

        this.optionsData.cities
          .filter(items => this.form.get('regions').value
            .filter(item => item === items.city).length > 0)
          .forEach(items => {
            this.cities = this.cities.concat(items.info);
          });

        if (this.form.get('regions').value.length === 1 && this.form.get('regions').value[0] === 'Երևան') {
          this.cities = [
            {label: 'Երևան', value: 'Երևան'}
          ];
          this.form.get('cities').setValue(['Երևան']);
          this.optionsData.communities.filter(item => item.city === 'Երևան')
            .forEach(items => {
              this.communities = this.communities.concat(items.info);
            });
        } else {
          this.form.get('cities').setValue([]);
          this.form.get('communities').setValue([]);
        }
      }
        break;
      case 'cities': {
        this.communities = [];
        this.optionsData.communities.filter(items => this.form.get('cities').value
          .filter(item => item === items.city).length > 0)
          .forEach(items => {
            this.communities = this.communities.concat(items.info);
          })
      }
        break;
      case 'communities': {
        this.streets = [];
        this.optionsData.streets.filter(items => this.form.get('communities').value
          .filter(item => item == items.communities).length > 0)
          .forEach(items => {
            this.streets = this.streets.concat(items.info);
          })
      }
        break;
    }
  }

  formSend() {
    this.searchFlage = true;
    setTimeout(_ => {
      this.searchFlage = false;
    }, 1600);
    console.log(this.form.value)
  }
  goToCreate() {
    this.router.navigate(['create', 'businesses']);
  }

}
