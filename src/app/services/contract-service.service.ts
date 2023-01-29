import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractServiceService {

  constructor(private http: HttpClient) { }

  public findAll(startDate: any, endDate: any, name: any): Observable<any> {
    let url = "http://localhost:8080/contract?name=" + name;
    if(startDate.length > 0) {
      url = url + "&from-date=" + startDate;
    }
    if(endDate.length > 0) {
      url = url + "&to-date=" + endDate;
    }
    return this.http.get<any>(url);
  }

  public save(contract: any, hotelId: any) {
    return this.http.post<any>("http://localhost:8080/contract/" + hotelId, contract);
  }

  public getAvailableContracts(searchValues: any) {
    return this.http.post<any>("http://localhost:8080/contract/available-contracts", searchValues);
  }
}
