import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EventsService} from "../../shared/services/events.service";
import {DataService} from "../../shared/services/data.service";
import * as $ from 'jquery';


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
  invalid = true;

  @ViewChild("fileUpload", {static: false}) fileUpload;


  constructor(private router: Router, private events: EventsService, private service: DataService) {
    this.form = new FormData();
    events.changeEmitted$.subscribe(
      data => {
        this.invalid = data.invalid;
        this.form.append(data.key, '');
        this.form.set(data.key, typeof (data.value) === "string" ? data.value : JSON.stringify(data.value));
      });
  }

  foo(event) {
    this.uploadedFiles = event;
  }


  ngOnInit() {
    this.gotoTopInit();
    this.form2 = new FormGroup({
      mapDetails: new FormControl('', [Validators.required]),
      phone1: new FormControl('', [Validators.required]),
      phone2: new FormControl(''),
      phone3: new FormControl(''),
      additionalInformation: new FormControl('', [Validators.required])
    });
  }


  onUpload(event) {
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
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
    this.service.postData(this.form, this.router.url.split('/')[2]).subscribe((data) => {
      console.log(data);
      this.form.delete('mapDetails');
      this.form.delete('phone');
      this.form.delete('additionalInformation');
      this.form.delete('images');
      this.form2.reset();
      this.uploadedFiles = [];
      // this.fileUpload.clear();
      this.events.emitChange4({});
      this.events.emitChange2({});
      this.gotoTop();
      this.router.navigate(['']);
    }, err => {
      this.form.delete('mapDetails');
      this.form.delete('phone');
      this.form.delete('additionalInformation');
      this.form.delete('images');
    });


  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  gotoTopInit() {
    window.scroll({
      top: 0,
      left: 0
    });
  }

}
