import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LabServiceService {
  BASEURL = environment.baseUrl;
  constructor(private http: HttpClient) {

  }

  addLabs(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}lab/save`, params);
  }
  bookLab(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}lab/userLabBooking`, params);
  }
  getAllLabs(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}lab/all`);
  }
  getLabsByUserId(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}lab/getLabsByUserId?userId=${id}`);
  }

}
