import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaiHtqService {
  public readonly API: string = 'http://localhost:8080/teacher';

  constructor(
    public http: HttpClient
  ) { }

  getAllTeacherService(): Observable<any> {
    return this.http.get(this.API + '/list');
  }

  findByID(idNeedFind: any): Observable<any> {
    return this.http.get(this.API + '/find-By-Id/' + idNeedFind);
  }
}


