import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {DataService} from "../../shared/services/data.service";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  uploadedFiles: object[] = [];
  user: string;
  form: FormData;
  form2: FormGroup;
  invalid;

  constructor(private router: Router, private events: EventsService, private service: DataService) {
    this.form = new FormData();
    events.changeEmitted$.subscribe(
      data => {
        console.log(data);
        this.invalid = data.invalid;
        this.form.append(data.key, '');
        this.form.set(data.key, JSON.stringify(data.value));
      });
  }

  ngOnInit() {
    this.form2 = new FormGroup({
      mapDetails: new FormControl('', [Validators.required]),
      phone1: new FormControl('', [Validators.required]),
      phone2: new FormControl(''),
      phone3: new FormControl(''),
      additionalInformation: new FormControl('', [Validators.required])
    });
    console.log(this.router.events);
    this.router.events.subscribe((data) => {
      console.log(data);
    });
  }


  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  sendForm(data) {
    console.log(data);
  }

  mapDetails(data) {
    this.form2.get('mapDetails').setValue(data);
  }

  form2Submit() {

    let phone = [];
    phone.push(this.form2.get('phone1').value);
    phone.push(this.form2.get('phone2').value);
    phone.push(this.form2.get('phone3').value);
    this.form.append('mapDetails', JSON.stringify(this.form2.get('mapDetails').value));
    this.form.append('phone', JSON.stringify(phone));
    this.form.append('additionalInformation', this.form2.get('additionalInformation').value);
    if (this.uploadedFiles && this.uploadedFiles.length > 0) {
      this.uploadedFiles.forEach((file: File) => {
        this.form.append('images', file);
      });
    }
    this.service.postApartments(this.form).subscribe((data) => {
      console.log(data);
    });
  }

}
