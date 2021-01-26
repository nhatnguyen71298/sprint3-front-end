import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {
  private apiFeedBack= 'http://localhost:8080/api/7';
  constructor(private http: HttpClient) { }

  getAllFeedBack(idAccount): Observable<any>{
    return this.http.get(this.apiFeedBack + '/' + idAccount);
  }
  getInfoQuestion(idQuestion): Observable<any>{
    return this.http.get(this.apiFeedBack + '/infoQuestion/' + idQuestion);
  }
  deleteQuestion(idQuestion): Observable<any>{
    return this.http.delete(this.apiFeedBack + '/infoQuestion/' + idQuestion);
  }
}
