import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navOpenClose = false;
  navActive = false;
  user: string;

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('am');
  }

  ngOnInit() {
  }

  toggleNav() {
    this.navOpenClose = !this.navOpenClose;
    this.navActive = !this.navActive;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
