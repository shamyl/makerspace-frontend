import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CoursesService {
   BASEURL = environment.baseUrl;
    constructor(private http: HttpClient) {

}

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/all`);
  }
  getTimePeriod(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/getTimePeriodList`);
  }
  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/getCourseStatus`);
  }
  getCoursebyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}course/${id}`);
  }
    getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.BASEURL}lab/all?isActive=true`);
  }
  addCourse(params: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.BASEURL}course/save`, params);
  }
  update(params: any): Observable<any[]> {
    return this.http.put<any[]>(`${this.BASEURL}course/update`, params);
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.BASEURL}course/delete?id=${userId}`);
  }
}
