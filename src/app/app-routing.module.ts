import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { HomeComponent } from './components/home/home.component';
import { SearchReservationComponent } from './components/search-reservation/search-reservation.component';

const routes: Routes = [
  { path: 'create', component: CreateContractComponent },
  { path: '', component: HomeComponent },
  { path: 'search-reservations', component: SearchReservationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
