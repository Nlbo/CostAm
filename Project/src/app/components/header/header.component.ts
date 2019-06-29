import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {PublicDataService} from '../../shared/services/public-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navOpenClose = false;
  navActive = false;
  user: string;

  constructor(private translate: TranslateService, public publicData: PublicDataService) {
    if (localStorage.getItem('language')) {
      translate.setDefaultLang(localStorage.getItem('language'));
    } else {
      translate.setDefaultLang('am');
    }
  }

  ngOnInit() {
  }

  goToEvaluation() {
    window.open(window.location.origin + '/evaluation', '_blank');
  }

  toggleNav() {
    this.navOpenClose = !this.navOpenClose;
    this.navActive = !this.navActive;
  }

  switchLanguage(language: string) {
    localStorage.setItem('language', language);
    this.publicData.language = language;
    this.translate.use(language);
  }

}
