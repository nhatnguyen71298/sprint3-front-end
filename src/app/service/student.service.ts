import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  public readonly API: string = 'http://localhost:8080/student';
  constructor(
    public http: HttpClient
  )
  { }
  getAllStudentService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }
}
