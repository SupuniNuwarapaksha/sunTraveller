import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractServiceService } from 'src/app/services/contract-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  contracts: any;
  searchForm: any;

  constructor(private contractService: ContractServiceService) {
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
    this.contractService.findAll(startDate, endDate, name).subscribe(data => {
      this.contracts = data.data;
    });
  }

  resetForm() {
    this.searchForm.reset();
    this.searchContracts("", "", "");
  }

}
