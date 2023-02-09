import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/services/customer.service';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrls: ['./create-hotel.component.css']
})
export class CreateHotelComponent {

  hotelForm: any;
  submit = false;
  createdHotel: any;
  submitted = false;
  customer: any;

  constructor(
    private hotelService: HotelService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateHotelComponent>) {
    this.hotelForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      location: new FormControl(''),
      contactName: new FormControl(''),
      contactNumber: new FormControl('')
    });
  }

  onSubmit(){
    this.submitted = true;
    this.hotelService.save(this.hotelForm.value)
      .subscribe(
        result => {
          this.createdHotel;
          this.submit = true;
          this.dialogRef.close();
          this.snackBar.open("Hotel created successfully!", "Ok", {duration: 3000})
        }
        );
  }

  closeDialog() {
    this.dialogRef.close();
  }

  searchCustomer(customerId: any) {
    this.customerService.search(customerId).subscribe(data => {
      this.customer = data.data;
    });
  }

}
