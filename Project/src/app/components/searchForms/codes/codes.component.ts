import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {

  searchFlage = false;
  user: string;


  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToCreate() {
    this.router.navigate(['create', 'codes']);
  }

}
