import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormControl, NgForm, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { min } from 'rxjs';
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
  pNo = 1;
  numbers: any;
  totalPages: any;
  selectedPage = 1;
  pSize = 10;
  contracts: any;
  now: any;

  constructor(private contractService: ContractServiceService, public dialog: MatDialog) {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
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
    .subscribe( data => {
      this.totalPages = Math.ceil(data.data.length / this.pSize);
      this.contracts = data.data;
      let firstElementIndex = (this.pNo - 1) * this.pSize < 0 ? 0 : (this.pNo - 1) * this.pSize;
      let lastElementIndex = (this.pNo * this.pSize);
      this.availableContracts = this.contracts.slice(firstElementIndex, lastElementIndex);
      this.numbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
    }
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
    let checkOutDate = new Date(checkInDate.getTime());
    checkOutDate.setDate(checkInDate.getDate() + this.reservationSearchForm.value.numberOfNights);
    const dialogRef = this.dialog.open(CreateReservationComponent, {
      width: "70%",
      height: "95%",
      data: { contract: contract, checkinDate: this.reservationSearchForm.value.checkInDate,
      checkoutDate: checkOutDate, numberOfDays:  this.reservationSearchForm.value.numberOfNights}
    });
  }

  nextPage(number: any) {
    this.pNo = number;
    this.selectedPage = number;
    let firstElementIndex = (this.pNo - 1) * this.pSize < 0 ? 0 : (this.pNo - 1) * this.pSize;
      let lastElementIndex = (this.pNo * this.pSize);
      this.availableContracts = this.contracts.slice(firstElementIndex, lastElementIndex);
  }

  previous() {
    if(this.pNo > 1) {
      this.pNo = this.pNo - 1;
      let firstElementIndex = (this.pNo - 1) * this.pSize < 0 ? 0 : (this.pNo - 1) * this.pSize;
      let lastElementIndex = (this.pNo * this.pSize);
      this.availableContracts = this.contracts.slice(firstElementIndex, lastElementIndex);
    }
  }

  next() {
    if(this.pNo < this.totalPages) {
      this.pNo = this.pNo + 1;
      let firstElementIndex = (this.pNo - 1) * this.pSize < 0 ? 0 : (this.pNo - 1) * this.pSize;
      let lastElementIndex = (this.pNo * this.pSize);
      this.availableContracts = this.contracts.slice(firstElementIndex, lastElementIndex);
    }
  }
}
