import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicDataService} from '../../../shared/services/public-data.service';
import {Router} from '@angular/router';
import {DataService} from "../../../shared/services/data.service";
import {EventsService} from "../../../shared/services/events.service";

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {

  searchFlage = false;


  form: FormGroup;
  user: string;
  cities: object[];
  communities: object[];
  streets: object[];

  constructor(public optionsData: PublicDataService, private router: Router, private service: DataService, private events: EventsService) {

    this.form = new FormGroup({
      transactions: new FormControl([], [Validators.required]),
      regions: new FormControl([], [Validators.required]),
      cities: new FormControl([], [Validators.required]),
      communities: new FormControl([], [Validators.required]),
      streets: new FormControl([], [Validators.required]),
      buildingTypes: new FormControl('', [Validators.required]),
      numberOfRooms: new FormControl([], [Validators.required]),
      areaValue: new FormControl('', [Validators.required]),
      pricesStart: new FormControl('', [Validators.required]),
      pricesEnd: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  onChange(item) {
    switch (item) {
      case 'regions': {
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

    this.service.getFiltredApartmens(this.form.value).subscribe((data) => {
      this.events.emitChange3(data);
      this.searchFlage = false;

    });
  }
  goToCreate() {
    this.router.navigate(['create', 'apartments']);
  }

}
