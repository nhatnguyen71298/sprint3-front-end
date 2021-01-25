import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  API_TEACHER = 'http://localhost:8080/statistics/teacher';
  API_STUDENT = 'http://localhost:8080/statistics/student';
  API_THESIS = 'http://localhost:8080/statistics/thesis';
  API_CHECKED_THESIS = 'http://localhost:8080/statistics/checked-thesis';

  constructor(private http: HttpClient) { }

  teacherStatistics(): Observable<any> {
    return this.http.get(this.API_TEACHER);
  }

  thesisStatistics(): Observable<any> {
    return this.http.get(this.API_THESIS);
  }

  studentStatistics(): Observable<any> {
    return this.http.get(this.API_STUDENT);
  }

  checkedThesisStatistics(): Observable<any> {
    return this.http.get(this.API_CHECKED_THESIS);
  }
}
