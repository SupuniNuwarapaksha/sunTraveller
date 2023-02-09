import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContractServiceService } from 'src/app/services/contract-service.service';

@Component({
  selector: 'app-delete-contract',
  templateUrl: './delete-contract.component.html',
  styleUrls: ['./delete-contract.component.css']
})
export class DeleteContractComponent {

  id: any;

  constructor(
    private contractService: ContractServiceService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteContractComponent>){
      this.id = data.id;
    }

  deleteContract() {
    this.contractService.deleteContract(this.id).subscribe(data => {
      let message = data.message;
      this.dialogRef.close();
      this.snackBar.open(message, "Ok", {duration: 3000});
    });
  }

  close() {
    this.dialogRef.close();
  }

}
