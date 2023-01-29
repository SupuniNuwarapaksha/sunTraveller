import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogPosition } from 'ng-pick-datetime/dialog/dialog-config.class';
import { ContractServiceService } from 'src/app/services/contract-service.service';
import { CreateReservationComponent } from '../create-reservation/create-reservation.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-search-reservation',
  templateUrl: './search-reservation.component.html',
  styleUrls: ['./search-reservation.component.css']
})
export class SearchReservationComponent {

  availableContracts: any;
  roomCount: any;
  roomTypeList: any[] = [];
  reservationSearchForm: any;

  constructor(private contractService: ContractServiceService, public dialog: MatDialog) {
    this.roomCount = new FormArray([]);
    this.reservationSearchForm = new FormGroup({
      checkInDate: new FormControl(''),
      numberOfNights: new FormControl(''),
      roomCount: this.roomCount
    });
  }

  onSubmit() {
    this.reservationSearchForm.value.roomCount = this.roomTypeList;
    this.reservationSearchForm.value.checkInDate = new Date(this.reservationSearchForm.value?.checkInDate).toISOString();
    this.contractService.getAvailableContracts(this.reservationSearchForm.value)
    .subscribe( data => 
      this.availableContracts = data.data
      );
  }

  onAdd(form: NgForm) {
    let itemFound = false;
    for (let item of this.roomTypeList) {
      if(item.numberOfAdults == form.value.numberOfAdults) {
        itemFound = true;
        item.numberOfBeds += form.value.numberOfBeds;
      }
    }
    if(!itemFound) {
      this.roomTypeList
    .push(form.value);
    }
    form.reset();
  }

  deleteControl(i: number) {
    if (this.roomTypeList) {
      this.roomTypeList
      .splice(i, 1);
    }
  }

  openDialog(contract: any): void {
    let checkInDate = new Date(this.reservationSearchForm.value.checkInDate);
    let checkOutDate = new Date(checkInDate.getDate() + 5);
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: "75%",
      height: "100%",
      position: {
        top: '-30%',
        left: '10%'
      },
      data: { contract: contract, checkinDate: this.reservationSearchForm.value.checkInDate,
      checkoutDate: checkOutDate }
    });
  }
}
