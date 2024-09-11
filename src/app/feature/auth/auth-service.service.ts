import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  BASEURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  loginUser(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}user/login`, params);
  }
  getCoursesbyUserId(params: any): Observable<any[]> {
  return this.http.post<any[]>(`${this.BASEURL}user/login`, params);
}
}
