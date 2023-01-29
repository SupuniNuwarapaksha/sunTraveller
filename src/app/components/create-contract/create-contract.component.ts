import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractServiceService } from 'src/app/services/contract-service.service';
import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { HotelService } from 'src/app/services/hotel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateHotelComponent } from '../create-hotel/create-hotel.component';
import { MatDialog } from '@angular/material/dialog';
import * as $ from 'jquery';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-contract',
  templateUrl: './create-contract.component.html',
  styleUrls: ['./create-contract.component.css'],
})
export class CreateContractComponent {
  @ViewChild('popup', { static: true }) popup: any;

  // contractForm: FormGroup;
  contractForm: any;
  hotels: any;
  roomTypes: any;
  roomTypeList: any[] = [];
  minDate = Date();
  hotelForm: any;
  submitted = false;
  submit = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contractService: ContractServiceService,
    private hotelService: HotelService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    public el: ElementRef,
    private modalService: NgbModal
  ) {
    this.roomTypes = new FormArray([]);
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

  ngOnInit() {
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
    this.contractService
      .save(this.contractForm.value, this.contractForm.value.hotelId)
      .subscribe((result) => {
        this.gotoList();
      });
    // this.snackBar.open("Form submitted successfully!", "Dismiss", {duration: 3000})
  }

  onAdd(form: NgForm) {
    this.roomTypeList.push(form.value);
    form.reset();
  }

  gotoList() {
    this.router.navigate(['/']);
  }

  deleteControl(i: number) {
    if (this.roomTypeList) {
      this.roomTypeList.splice(i, 1);
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateHotelComponent, {
      width: '75%',
      height: '100%',
      position: {
        left: '10%',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.getAllHotels();
    });
  }

  hideFunc() {
    this.modalService.dismissAll();
  }

  onSubmitHotel() {
    this.submitted = true;
    this.hotelService.save(this.hotelForm.value).subscribe((result) => {
      this.submit = true;
    });
  }
}
