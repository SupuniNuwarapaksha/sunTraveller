import {
  Component,
  ElementRef,
  Inject,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerService } from 'src/app/services/customer.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css'],
})
export class CreateReservationComponent {
  contract: any;
  checkinDate: any;
  checkoutDate: any;
  roomTypeList: any;
  @ViewChildren('numberOfRooms', { read: ElementRef })
  numberOfRooms: QueryList<ElementRef>;
  calculatedPrice = 0;
  customerForm: any;
  reservedClicked = false;
  reservationForm: any;
  customer: any;
  existingCustomer = false;
  numberOfNights = 0;

  constructor(
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<CreateReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private customerService: CustomerService
  ) {
    this.contract = data.contract;
    this.checkinDate = data.checkinDate;
    this.checkoutDate = data.checkoutDate;
    this.numberOfNights = data.numberOfDays;
    this.numberOfRooms = new QueryList<ElementRef>();
    this.roomTypeList = this.contract.roomTypes;
    this.customerForm = new FormGroup({
      name: new FormControl(''),
      contactNumber: new FormControl(''),
      isNew: new FormControl(''),
      existingIdNumber: new FormControl(''),
      idNumber: new FormControl(''),
      address: new FormControl(''),
      reservations: new FormControl([]),
    });
    this.reservationForm = new FormGroup({
      customer: new FormControl(''),
      reservationDtos: new FormControl([]),
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  changeValue(event: any, roomType: any) {
    if (!isNaN(Number(event.target.value))) {
      for (let type of this.roomTypeList) {
        if (type.id == roomType.id) {
          this.calculatedPrice +=
            type.price *
            (event.target.value -
              (type.reservedRooms ? type.reservedRooms : 0)) * (this.contract.markup ? this.contract.markup : 1) *
              this.numberOfNights;
          type.reservedRooms = event.target.value;
        }
      }
    }
  }

  reserveRooms() {
    this.reservedClicked = true;
  }

  onSubmit() {
    let reservationArray = this.getReservation();
    this.customerForm.value.reservations = reservationArray;
    if (this.existingCustomer) {
      this.customerForm.value.isNew = false;
    } else {
      this.customerForm.value.isNew = true;
    }
    if (reservationArray[0].roomTypeReservations.length > 0) {
      this.reservationService.save(this.customerForm.value).subscribe();
    } else {
      return;
    }
  }

  getReservation() {
    let roomReservationList = this.getRoomReservationList();
    let reservationList = [];
    let reservation = {
      fromDate: this.checkinDate,
      toDate: this.checkoutDate,
      roomTypeReservations: roomReservationList,
      totalAmount: this.calculatedPrice
    };
    reservationList.push(reservation);
    return reservationList;
  }

  getRoomReservationList() {
    let reservationArray = [];
    for (let type of this.roomTypeList) {
      if (type.reservedRooms && type.reservedRooms > 0) {
        let reservation = {
          roomCount: type.reservedRooms,
          roomType: type,
        };
        reservationArray.push(reservation);
      }
    }
    return reservationArray;
  }

  searchCustomer() {
    if (!this.existingCustomer) {
      this.customerService
        .search(this.customerForm.value.existingIdNumber)
        .subscribe((data) => {
          this.customer = data.data;
          this.existingCustomer = true;
          this.customerForm.value.name = this.customer.name;
          this.customerForm.value.contactNumber = this.customer.contactNumber;
          this.customerForm.value.isNew = false;
          this.customerForm.value.idNumber = this.customer.idNumber;
          this.customerForm.value.address = this.customer.address;
          this.customerForm.patchValue({
            name: this.customer.name,
            contactNumber: this.customer.contactNumber,
            isNew: false,
            idNumber: this.customer.idNumber,
            address: this.customer.address,
          });
        });
    } else {
      this.customerForm.patchValue({
        name: '',
        contactNumber: '',
        isNew: true,
        idNumber: '',
        address: '',
      });
      this.existingCustomer = false;
      this.customerForm.value.isNew = true;
    }
  }
}
