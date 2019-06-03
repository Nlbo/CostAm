import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PublicDataService} from "../../../shared/services/public-data.service";
import {EventsService} from "../../../shared/services/events.service";

@Component({
  selector: 'app-create-houses',
  templateUrl: './create-houses.component.html',
  styleUrls: ['./create-houses.component.css']
})
export class CreateHousesComponent implements OnInit {
  form: FormGroup;
  form2: FormGroup;
  user: string;
  cities: object[];
  communities: object[];
  streets: object[];
  sale = true;
  rent = true;
  dailyRent = true;




  constructor(public optionsData: PublicDataService, private events: EventsService) {
    events.changeEmitted2$.subscribe(
      data => {
        this.form.reset();
      });
  }

  onClick(){

  }

  ngOnInit() {
    this.form = new FormGroup({
      transactions: new FormControl([], [Validators.required]),
      regions: new FormControl('', [Validators.required]),
      cities: new FormControl('', [Validators.required]),
      communities: new FormControl({value: '', disabled: false}, [Validators.required]),
      streets: new FormControl({value: '', disabled: false}, [Validators.required]),
      numberOfRooms: new FormControl('', [Validators.required]),
      flooring: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      landArea: new FormControl('', [Validators.required]),
      livingSpace: new FormControl('', [Validators.required]),
      supportingArea: new FormControl('', [Validators.required]),
      interiorDecorations: new FormControl('', [Validators.required]),
      buildingTypes: new FormControl('', [Validators.required]),
      covers: new FormControl('', [Validators.required]),
      ceilingValue: new FormControl('', [Validators.required]),
      additionalInfoFields: new FormControl('', [Validators.required]),
      currencyForSale: new FormControl({value: '', disabled: true}),
      priceForSale: new FormControl({value: '', disabled: true}),
      currencyForRent: new FormControl({value: '', disabled: true}),
      priceForRent: new FormControl({value: '', disabled: true}),
      currencyForDailyRent: new FormControl({value: '', disabled: true}),
      priceForDailyRent: new FormControl({value: '', disabled: true}),
    });

    this.form2 = new FormGroup({
      priceForSale: new FormControl('', [Validators.required]),
      currencyForSale: new FormControl('', [Validators.required]),
    });
  }


  foo() {
    console.log(this.form2.invalid);
  }

  set() {
    this.form2.get('priceForSale').setValidators([Validators.required]);
    this.form2.get('currencyForSale').setValidators([Validators.required]);
  }

  clear() {
    console.log('clear');
    this.form2.get('currencyForSale').setValidators([]);
    this.form2.get('priceForSale').setValidators([]);
  }

  validate() {
    if (this.form.get('transactions').value && this.form.get('transactions').value.length > 0) {
      this.form.get('transactions').value.forEach(item => {
        if (item === 'Վաճառք' && this.form.get('currencyForSale').value && this.form.get('priceForSale').value) {
          this.sale = true;
        } else if (item === 'Վաճառք') {
          this.sale = false;
        }
        if (item === 'Վարձակալություն' && this.form.get('currencyForRent').value && this.form.get('priceForRent').value) {
          this.rent = true;
        } else if (item === 'Վարձակալություն') {
          this.rent = false;
        }
        if (item === 'Օրավարձով' && this.form.get('currencyForDailyRent').value && this.form.get('priceForDailyRent').value) {
          this.dailyRent = true;
        } else if (item === 'Օրավարձով') {
          this.dailyRent = false;
        }
      });
    } else {
      this.sale = true;
      this.rent = true;
      this.dailyRent = true;
    }
  }

  async send(item) {
    switch (item) {
      case 'transactions': {
        if (this.form.get('transactions').value && this.form.get('transactions').value.length > 0) {
          if (this.form.get('transactions').value.indexOf('Վաճառք') >= 0) {
            this.form.get('currencyForSale').enable();
            this.form.get('priceForSale').enable();
            this.sale = false;
          } else {
            this.form.get('currencyForSale').disable();
            this.form.get('priceForSale').disable();
            this.sale = true;
          }

          if (this.form.get('transactions').value.indexOf('Վարձակալություն') >= 0) {
            this.form.get('currencyForRent').enable();
            this.form.get('priceForRent').enable();
            this.rent = false;
          } else {
            this.form.get('currencyForRent').disable();
            this.form.get('priceForRent').disable();
            this.rent = true;
          }

          if (this.form.get('transactions').value.indexOf('Օրավարձով') >= 0) {
            this.form.get('currencyForDailyRent').enable();
            this.form.get('priceForDailyRent').enable();
            this.dailyRent = false;
          } else {
            this.form.get('currencyForDailyRent').disable();
            this.form.get('priceForDailyRent').disable();
            this.dailyRent = true;
          }
        } else {
          this.form.reset('');
          this.form.get('currencyForSale').disable();
          this.form.get('priceForSale').disable();
          this.form.get('currencyForRent').disable();
          this.form.get('priceForRent').disable();
          this.form.get('currencyForDailyRent').disable();
          this.form.get('priceForDailyRent').disable();
          this.sale = true;
          this.rent = true;
          this.dailyRent = true;
        }
      }
        break;
      case 'regions': {
        this.cities = [];
        this.communities = [];

        this.optionsData.cities
          .filter(items => items.city === this.form.get('regions').value)
          .forEach(items => {
            this.cities = this.cities.concat(items.info);
          });

        if (this.form.get('regions').value && this.form.get('regions').value === 'Երևան') {
          this.form.get('communities').enable();
          this.form.get('communities').setValue('');
          this.form.get('streets').enable();
          this.form.get('streets').setValue('');
          this.cities = [
            {label: 'Երևան', value: 'Երևան'}
          ];
          let data = {
            key: 'cities',
            value: 'Երևան',
            invalid: !(this.form.valid && this.rent && this.sale && this.dailyRent)
          };
          // console.log(data);
          this.events.emitChange(data);
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

        if (this.form.get('regions').value !== 'Երևան') {
          if (this.form.get(item).value && this.form.get(item).value.indexOf('Գյուղեր') >= 0) {
            this.form.get('streets').disable();
            this.form.get('streets').setValue('null');
            this.form.get('communities').enable();
            this.form.get('communities').setValue('');
          } else {
            this.form.get('communities').disable();
            this.form.get('communities').setValue('null');
            this.form.get('streets').disable();
            this.form.get('streets').setValue('null');
          }
        } else {
          // console.log('sssss')
          this.form.get('communities').enable();
          this.form.get('communities').setValue('');
          this.form.get('streets').enable();
          this.form.get('streets').setValue('');
        }
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

    await this.validate();

    let data = {
      key: item,
      value: this.form.get(item).value,
      invalid: !(this.form.valid && this.rent && this.sale && this.dailyRent)
    };
    this.events.emitChange(data);
  }
}
