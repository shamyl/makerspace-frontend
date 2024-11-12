import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadsService {
  // private baseUrl = 'http://localhost:7100/makerspace/documents/save?moduleId=1&moduleType=Course';
  private baseUrl = 'http://35.232.175.135/makerspace/documents/save?moduleId=1&moduleType=Course'
  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
