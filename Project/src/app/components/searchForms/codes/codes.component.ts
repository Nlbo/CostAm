import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from "../../../shared/services/data.service";
import {EventsService} from "../../../shared/services/events.service";

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {

  searchFlage = false;
  user: string;
  code = '';

  constructor(private router: Router, private service: DataService, private events: EventsService) { }

  ngOnInit() {
  }
  // goToCreate() {
  //   this.router.navigate(['create', 'codes']);
  // }

  foo() {
    this.searchFlage = true;
    this.service.getFiltredCode(this.code).subscribe((data) => {
      this.events.emitChange3(data);
      this.searchFlage = false;

    });
  }

}
