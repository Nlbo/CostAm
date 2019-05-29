import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ApartmentsComponent} from './components/searchForms/apartments/apartments.component';
import {HousesComponent} from "./components/searchForms/houses/houses.component";
import {CommercialsComponent} from "./components/searchForms/commercials/commercials.component";
import {LandsComponent} from "./components/searchForms/lands/lands.component";
import {BusinessesComponent} from "./components/searchForms/businesses/businesses.component";
import {CodesComponent} from "./components/searchForms/codes/codes.component";
import {NewlybuiltsComponent} from "./components/searchForms/newlybuilts/newlybuilts.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
      {path: 'apartments', component: ApartmentsComponent},
      {path: 'houses', component: HousesComponent},
      {path: 'commercials', component: CommercialsComponent},
      {path: 'lands', component: LandsComponent},
      {path: 'businesses', component: BusinessesComponent},
      {path: 'codes', component: CodesComponent},
      {path: 'newlyBuilts', component: NewlybuiltsComponent},
      {path: '', redirectTo: '/apartments', pathMatch: 'full'}
    ]},
  {path: '', redirectTo: '/home/apartments', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
