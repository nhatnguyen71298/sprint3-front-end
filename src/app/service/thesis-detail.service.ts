import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThesisDetailService {

  constructor(public http: HttpClient) {
  }

  getCheckThesis(studentId):Observable<any>{
    return this.http.get('http://localhost:8080/period-time/get-list'+ studentId);
  }
}
