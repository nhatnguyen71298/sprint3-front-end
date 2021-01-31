import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThesisDetailService {

  API_GET_CHECK_THESIS = 'http://localhost:8080/thesis-detail/check-thesis-detail/';
  API_UPLOAD_THESIS_DETAIL = 'http://localhost:8080/thesis-detail/upload-thesis-detain';
  API_GET_LIST = 'http://localhost:8080/thesis-detail/get-thesis-detail-list';

  constructor(public http: HttpClient) {

  }

  getCheckThesis(studentId): Observable<any> {
    return this.http.get(this.API_GET_CHECK_THESIS + studentId);
  }

  uploadThesisDetail(thesisDetail): Observable<any> {
    return this.http.post(this.API_UPLOAD_THESIS_DETAIL, thesisDetail);
  }

  getThesisDetailList(): Observable<any> {
    return this.http.get(this.API_GET_LIST);
  }
}
