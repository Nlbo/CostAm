import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MapComponent} from './components/map/map.component';
import {HomeComponent} from './pages/home/home.component';
import {SliderComponent} from './components/slider/slider.component';
import {ApartmentsComponent} from './components/searchForms/apartments/apartments.component';
import {HousesComponent} from './components/searchForms/houses/houses.component';
import {BusinessesComponent} from './components/searchForms/businesses/businesses.component';
import {LandsComponent} from './components/searchForms/lands/lands.component';
import {CommercialsComponent} from './components/searchForms/commercials/commercials.component';
import {CodesComponent} from './components/searchForms/codes/codes.component';
import {NewlybuiltsComponent} from './components/searchForms/newlybuilts/newlybuilts.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {AgmCoreModule} from '@agm/core';

import {AccordionModule} from 'primeng/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MultiSelectModule} from 'primeng/multiselect';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {DropdownModule} from 'primeng/dropdown';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    HomeComponent,
    SliderComponent,
    ApartmentsComponent,
    HousesComponent,
    BusinessesComponent,
    LandsComponent,
    CommercialsComponent,
    CodesComponent,
    NewlybuiltsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SlickCarouselModule,
    HttpClientModule,
    AccordionModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBrq8jkgCgDa3AvM5EmGPc39t1l_sVNdOk'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
],
providers: [],
  bootstrap
:
[AppComponent]
})

export class AppModule {
}
