import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  API_TEACHER = 'http://localhost:8080/statistics/teacher';
  API_THESIS = 'http://localhost:8080/statistics/thesis';

  constructor(private http: HttpClient) { }

  teacherStatistics(): Observable<any> {
    return this.http.get(this.API_TEACHER);
  }

  thesisStatistics(): Observable<any> {
    return this.http.get(this.API_THESIS);
  }
}
