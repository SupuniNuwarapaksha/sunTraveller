import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  apiUrl = "http://localhost:8080/hotel";


  constructor(private http: HttpClient) { }

  public findAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  public save(hotel: any) {
    return this.http.post<any>(this.apiUrl, hotel);
  }
}
