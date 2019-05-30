import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PublicDataService} from '../../../shared/services/public-data.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-apartments',
  templateUrl: './create-apartments.component.html',
  styleUrls: ['./create-apartments.component.css']
})
export class CreateApartmentsComponent implements OnInit {
  form: FormGroup;
  user: string;
  cities: object[];
  communities: object[];
  streets: object[];

  @Output() sendForm = new EventEmitter();

  constructor(public optionsData: PublicDataService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      transactions: new FormControl('', [Validators.required]),
      regions: new FormControl('', [Validators.required]),
      cities: new FormControl('', [Validators.required]),
      communities: new FormControl('', [Validators.required]),
      streets: new FormControl('', [Validators.required]),
      numberOfRooms: new FormControl('', [Validators.required]),
    });
  }

  send(item) {
    switch (item) {
      case 'regions': {
        this.cities = [];
        this.communities = [];

        this.optionsData.cities
          .filter(items => items.city === this.form.get('regions').value)
          .forEach(items => {
            this.cities = this.cities.concat(items.info);
          });

        if (this.form.get('regions').value && this.form.get('regions').value === 'Երևան') {
          this.cities = [
            {label: 'Երևան', value: 'Երևան'}
          ];
          console.log('cities', this.form.get(item).value);
          // this.sendForm.emit(item, this.form.get(item).value);
          this.form.get('cities').setValue('Երևան');
          this.optionsData.communities.filter(item => item.city === 'Երևան')
            .forEach(items => {
              this.communities = this.communities.concat(items.info);
            });
        } else {
          this.form.get('cities').setValue('');
          this.form.get('communities').setValue('');
        }
      }
        break;
      case 'cities': {
        this.communities = [];
        this.optionsData.communities.filter(items => items.city === this.form.get('cities').value)
          .forEach(items => {
            this.communities = this.communities.concat(items.info);
          });
      }
        break;
      case 'communities': {
        this.streets = [];
        this.optionsData.streets.filter(items => items.communities === this.form.get('communities').value)
          .forEach(items => {
            this.streets = this.streets.concat(items.info);
          });
      }
        break;
    }
    console.log(item, this.form.get(item).value);
    // this.sendForm.emit(item, this.form.get(item).value);
  }

}
