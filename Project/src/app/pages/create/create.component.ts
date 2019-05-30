import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  uploadedFiles: object[];
  user: string;
  form: FormData;
  form2: FormGroup;

  constructor() {
  }

  ngOnInit() {
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
    this.form.append('mapDetails', this.form2.get('mapDetails').value);
    this.form.append('phone1', this.form2.get('phone1').value);
    this.form.append('phone2', this.form2.get('phone2').value);
    this.form.append('phone3', this.form2.get('phone3').value);
    this.form.append('additionalInformation', this.form2.get('additionalInformation').value);
    this.uploadedFiles.forEach((file: File) => {
      this.form.append('images', file);
    });
  }

}
