import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicDataService} from '../../shared/services/public-data.service';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.css']
})
export class ApartmentsComponent implements OnInit {
  form: FormGroup;
  user: string;
  cities: object[];
  communities: object[];

  constructor(public optionsData: PublicDataService) {

    this.form = new FormGroup({
      transactions: new FormControl([], [Validators.required]),
      regions: new FormControl([], [Validators.required]),
      cities: new FormControl([], [Validators.required]),
      communities: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit() {
  }

  onChange(item) {
    switch (item) {
      case 'region': {
        this.cities = [];
        let candidate = this.optionsData.cities
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
          let candidate = this.optionsData.communities.filter(item => item.city === 'Երևան')
            .forEach(items => {
              this.communities = this.communities.concat(items.info);
            });
        } else {
          this.form.get('cities').setValue([]);
          this.form.get('communities').setValue([]);
        }
      }
        break;
    }
  }

  formSend() {
    // todo
  }

}
