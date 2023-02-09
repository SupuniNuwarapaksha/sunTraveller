import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = "http://localhost:8080/reservation";

  constructor(private http: HttpClient) { }

  public save(reservation: any) {
    return this.http.post<any>(this.apiUrl, reservation);
  }

  public filterReservation(customerId: any, startDate: any, endDate: any): Observable<any> {
    let url =  this.apiUrl + "?customer-id=" + customerId;
    if(startDate.length > 0) {
      url = url + "&from-date=" + startDate;
    }
    if(endDate.length > 0) {
      url = url + "&to-date=" + endDate;
    }
    return this.http.get<any>(url);
  }

  public deleteReservation(reservationId: any): Observable<any> {
    let url = this.apiUrl + reservationId;
    return this.http.delete<any>(url);
  }
}
