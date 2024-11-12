import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   BASEURL = environment.baseUrl;
  //  apiUrl = 'http://localhost:7100';
    apiUrl = 'http://35.232.175.135';
    constructor(private http: HttpClient) {

}

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/all`);
  }
  getUser(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}user/all`);
  }
  getTimePeriod(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/getTimePeriodList`);
  }
  getUserById(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}user/type`);
  }
  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/getCourseStatus`);
  }
  getCoursebyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/${id}`);
  }
    getAllLabs(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}lab/all?isActive=true`);
  }
  addCourse(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}course/save`, params);
  }
  addLabs(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}lab/save`, params);
  }
  addUser(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}user/save`, params);
  }
  update(params: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.BASEURL}course/update`, params);
  }
  updateLabs(params: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.BASEURL}lab/update`, params);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BASEURL}course/delete?id=${userId}`);
  }
  deleteLabs(userId: number): Observable<any> {
    return this.http.delete(`${this.BASEURL}lab/delete?id=${userId}`);
  }

  uploadCourseFiles(courseId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.BASEURL}/makerspace/documents/save?moduleId=${courseId}&moduleType=Course`, formData);
  }

  getDocumentsById(moduleId: any): Observable<any> {
      return this.http.get<any>(`${this.BASEURL}documents/by-module-id?moduleId=${moduleId}&moduleType=Course`);
  }
}
