import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  apiUrl = "http://localhost:8080/contract";

  constructor(private http: HttpClient) { }

  public findAll(startDate: any, endDate: any, name: any, pNo: any, pSize: any): Observable<any> {
    let url = this.apiUrl + "?name=" + name + "&pNo=" + pNo + "&pSize=" + pSize;
    if(startDate.length > 0) {
      url = url + "&from-date=" + startDate;
    }
    if(endDate.length > 0) {
      url = url + "&to-date=" + endDate;
    }
    return this.http.get<any>(url);
  }

  public save(contract: any, hotelId: any) {
    return this.http.post<any>(this.apiUrl +  "/" + hotelId, contract);
  }

  public getAvailableContracts(searchValues: any) {
    return this.http.post<any>(this.apiUrl +  "/available-contracts", searchValues);
  }

  public deleteContract(contractId: any) {
    return this.http.delete<any>(this.apiUrl + "/" +  contractId);
  }

  public updateContract(contractId: any, contract: any) {
    return this.http.put<any>(this.apiUrl + "/" +  contractId, contract);
  }
}
