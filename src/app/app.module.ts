import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateContractComponent } from './components/create-contract/create-contract.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchReservationComponent } from './components/search-reservation/search-reservation.component'; 
import {MatDialogModule} from '@angular/material/dialog';
import { CreateReservationComponent } from './components/create-reservation/create-reservation.component'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateHotelComponent } from './components/create-hotel/create-hotel.component';
import { DeleteContractComponent } from './components/delete-contract/delete-contract.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    CreateContractComponent,
    SearchReservationComponent,
    CreateReservationComponent,
    CreateHotelComponent,
    DeleteContractComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
