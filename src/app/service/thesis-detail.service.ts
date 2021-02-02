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
  API_GET_STUDENT_ID_BY_ACCOUNT_ID = 'http://localhost:8080/thesis-detail/get-student-id/';
  API_GET_STUDENT_LIST = 'http://localhost:8080/thesis-detail/get-list-student/';
  API_UPLOAD_COMMENT = 'http://localhost:8080/thesis-detail/upload-comment/';
  API_GET_POSITION_STUDENT = 'http://localhost:8080/thesis-detail/get-position-student/';


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

  getStudentIdByAccountId(accountId): Observable<any> {
    return this.http.get(this.API_GET_STUDENT_ID_BY_ACCOUNT_ID + accountId);
  }

  getStudentList(thesisDetailId): Observable<any> {
    return this.http.get(this.API_GET_STUDENT_LIST + thesisDetailId);
  }

  uploadComment(thesisDetailId, formComment): Observable<any> {
    return this.http.post(this.API_UPLOAD_COMMENT + thesisDetailId, formComment)
  }

  getPosition(studentId): Observable<any> {
    return this.http.get(this.API_GET_POSITION_STUDENT + studentId);
  }
}
