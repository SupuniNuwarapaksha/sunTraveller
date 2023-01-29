import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public save(reservation: any) {
    return this.http.post<any>("http://localhost:8080/reservation", reservation);
  }
}
