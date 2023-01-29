import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {


  constructor(private http: HttpClient) { }

  public findAll(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/hotel");
  }

  public save(hotel: any) {
    return this.http.post<any>("http://localhost:8080/hotel", hotel);
  }
}
