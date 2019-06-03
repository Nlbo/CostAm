import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ApartmentsComponent} from './components/searchForms/apartments/apartments.component';
import {HousesComponent} from './components/searchForms/houses/houses.component';
import {CommercialsComponent} from './components/searchForms/commercials/commercials.component';
import {LandsComponent} from './components/searchForms/lands/lands.component';
import {BusinessesComponent} from './components/searchForms/businesses/businesses.component';
import {CodesComponent} from './components/searchForms/codes/codes.component';
import {NewlybuiltsComponent} from './components/searchForms/newlybuilts/newlybuilts.component';
import {CreateApartmentsComponent} from './components/createForms/create-apartments/create-apartments.component';
import {CreateHousesComponent} from './components/createForms/create-houses/create-houses.component';
import {CreateCommercialsComponent} from './components/createForms/create-commercials/create-commercials.component';
import {CreateLandsComponent} from './components/createForms/create-lands/create-lands.component';
import {CreateBusinessesComponent} from './components/createForms/create-businesses/create-businesses.component';
import {CreateCodesComponent} from './components/createForms/create-codes/create-codes.component';
import {CreateNewlybuiltsComponent} from './components/createForms/create-newlybuilts/create-newlybuilts.component';
import {CreateComponent} from './pages/create/create.component';
import {DetailsComponent} from "./pages/details/details.component";

const routes: Routes = [
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'apartments', component: ApartmentsComponent},
      {path: 'houses', component: HousesComponent},
      {path: 'commercials', component: CommercialsComponent},
      {path: 'lands', component: LandsComponent},
      {path: 'businesses', component: BusinessesComponent},
      {path: 'codes', component: CodesComponent},
      {path: 'newlyBuilts', component: NewlybuiltsComponent},
      {path: '', redirectTo: '/apartments', pathMatch: 'full'}
    ]
  },
  {
    path: 'create', component: CreateComponent, children: [
      {path: 'apartments', component: CreateApartmentsComponent},
      {path: 'houses', component: CreateHousesComponent},
      {path: 'commercials', component: CreateCommercialsComponent},
      {path: 'lands', component: CreateLandsComponent},
      {path: 'businesses', component: CreateBusinessesComponent},
      {path: 'codes', component: CreateCodesComponent},
      {path: 'newlyBuilts', component: CreateNewlybuiltsComponent},
      {path: '', redirectTo: '/apartments', pathMatch: 'full'}
    ]
  },
  {path: 'details', component: DetailsComponent},
  {path: '', redirectTo: '/home/apartments', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
