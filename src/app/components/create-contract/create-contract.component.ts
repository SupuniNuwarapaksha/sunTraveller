import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractServiceService } from 'src/app/services/contract-service.service';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateHotelComponent } from '../create-hotel/create-hotel.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as $ from 'jquery';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent {
  @ViewChild('popup', { static: true }) popup: any;

  contractForm: any;
  hotels: any;
  roomTypes: any;
  roomTypeList: any[] = [];
  minDate = Date();
  hotelForm: any;
  submitted = false;
  submit = false;
  now: any;
  endDateMIn: any;
  contract: any;
  isUpdate = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractServiceService,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public el: ElementRef,
    public dialogRef: MatDialogRef<CreateContractComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.roomTypes = new FormArray([]);
    this.isUpdate = data.isEdit;
    if(this.isUpdate) {
      this.contract = data.contract;
      this.contractForm = new FormGroup({
        hotelId: new FormControl(this.contract.hotel?.id),
        markup: new FormControl(this.contract.markup),
        startDate: new FormControl(this.contract.startDate.substring(0, 10)),
        endDate: new FormControl(this.contract.endDate.substring(0, 10)),
        hotel: new FormControl(this.contract.hotel),
        roomTypes: this.roomTypes,
      });
      this.hotelForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        location: new FormControl(''),
        contactName: new FormControl(''),
        contactNumber: new FormControl(''),
      });
      this.roomTypeList = this.contract.roomTypes;
    } else {
      this.contractForm = new FormGroup({
        hotelId: new FormControl(''),
        markup: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        roomTypes: this.roomTypes,
      });
      this.hotelForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        location: new FormControl(''),
        contactName: new FormControl(''),
        contactNumber: new FormControl(''),
      });
    }
  }

  ngOnInit() {
    const datePipe = new DatePipe('en-Us');
    this.now = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getAllHotels();
  }

  getAllHotels() {
    this.hotelService.findAll().subscribe((data) => {
      this.hotels = data.data;
    });
  }

  onSubmit() {
    this.contractForm.value.roomTypes = this.roomTypeList;
    this.contractForm.value.startDate = new Date(
      this.contractForm.value?.startDate
    ).toISOString();
    this.contractForm.value.endDate = new Date(
      this.contractForm.value?.endDate
    ).toISOString();
    if(this.isUpdate) {
      this.contractForm.value.hotel = {
        id: this.contractForm.value.hotelId
      }
    }
    if(this.isUpdate) {
      this.contractService
      .updateContract(this.contract.id, this.contractForm.value)
      .subscribe((result) => {
        this.gotoList();
        this.snackBar.open("Contract updated successfully!", "Ok", 
        {duration: 300000, verticalPosition: 'top', panelClass: 'notif-success'});
        this.dialogRef.close();
      });
    } else {
      this.contractService
      .save(this.contractForm.value, this.contractForm.value.hotelId)
      .subscribe((result) => {
        this.gotoList();
        this.snackBar.open("Contract created successfully!", "Ok", 
        {duration: 3000});
        this.dialogRef.close();
      });
    }
    
  }

  onAdd(form: NgForm) {
    form.value.status = "NEW";
    this.roomTypeList.push(form.value);
    form.reset();
  }

  gotoList() {
    this.router.navigate(['/']);
  }

  deleteContract(i: number, type: any) {
    if(this.isUpdate && type.id) {
      type.status = "DELETED";
    } else {
      if (this.roomTypeList) {
        this.roomTypeList.splice(i, 1);
      }
    }
  }

  updateContract() {

  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateHotelComponent, {
      width: '55%',
      height: '36%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllHotels();
    });
  }

  changeEndDateMin(event: any) {
    const datePipe = new DatePipe('en-Us');
    this.endDateMIn = datePipe.transform(new Date(this.contractForm.value?.startDate), 'yyyy-MM-dd');
    if(new Date(this.contractForm.value?.endDate).getTime() < new Date(this.contractForm.value?.startDate).getTime()) {
      this.contractForm.controls['endDate'].setValue('');
    }
  }
}
