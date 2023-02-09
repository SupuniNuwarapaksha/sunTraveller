import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContractServiceService } from 'src/app/services/contract-service.service';
import { CreateContractComponent } from '../create-contract/create-contract.component';
import { DeleteContractComponent } from '../delete-contract/delete-contract.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  contracts: any;
  searchForm: any;
  pNo = 1;
  numbers: any;
  totalPages: any;
  selectedPage = 1;
  pSize = 10;


  constructor(
    private contractService: ContractServiceService,
    public dialog: MatDialog) {
    this.searchForm = new FormGroup({
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl(''),
      name: new FormControl('')
    })
  }

  ngOnInit() {
    this.searchContracts("", "", "");
  }

  onSubmit() {
    let startingDate = this.searchForm.value.startDate != null && this.searchForm.value.startDate.length > 0 ? 
    new Date(this.searchForm.value.startDate).toISOString():"";
    let endingDate = this.searchForm.value.endDate != null && this.searchForm.value.endDate.length > 0 ? 
    new Date(this.searchForm.value.endDate).toISOString():"";
    let name = this.searchForm.value.name != null ? this.searchForm.value.name : "";
    this.searchContracts(startingDate, endingDate, name);
  }

  searchContracts(startDate: any, endDate: any, name: any) {
    this.contractService.findAll(startDate, endDate, name, this.pNo, this.pSize).subscribe(data => {
      this.contracts = data.data.content;
      this.totalPages = data.data.totalPages;
      this.numbers = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.searchContracts("", "", "");
  }

  nextPage(number: any) {
    this.pNo = number;
    this.selectedPage = number;
    this.onSubmit();
  }

  previous() {
    if(this.pNo > 1) {
      this.pNo = this.pNo - 1;
      this.onSubmit();
    }
  }

  next() {
    if(this.pNo < this.totalPages) {
      this.pNo = this.pNo + 1;
      this.onSubmit();
    }
  }

  deleteContract(id: any){
    const dialogRef = this.dialog.open(DeleteContractComponent, {
      width: "40%",
      height: "35%",
      data: { id : id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onSubmit();
    });
  }

  createContract(){
    const dialogRef = this.dialog.open(CreateContractComponent, {
      width: "100%",
      height: "95%",
      data: { isEdit : false, contract: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onSubmit();
    });
  }

  updateContract(contract: any) {
    const dialogRef = this.dialog.open(CreateContractComponent, {
      width: "100%",
      height: "95%",
      data: { isEdit : true, contract: contract}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onSubmit();
    });
  }

}
