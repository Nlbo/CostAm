import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ApartmentsComponent} from './components/apartments/apartments.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, children: [
      {path: 'apartments', component: ApartmentsComponent},
      {path: '', redirectTo: '/apartments', pathMatch: 'full'}
    ]},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
