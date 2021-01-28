import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(public http: HttpClient) {
  }

  public API_LIST_STUDENT = 'http://localhost:8080/group';
  public API_CHECK_THESIS = 'http://localhost:8080/check-thesis';

  /*List student*/
  public getAllStudent(): Observable<any> {
    return this.http.get(this.API_LIST_STUDENT + '/list-student-group/2')
  }

  /*List check thesis unapproved*/
  public getAllCheckThesis(): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/list-check-thesis/2')
  }

  /*List check thesis approved*/
  public getAllCheckThesisApproved(): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/list-check-thesis-approved/2')
  }

  /*Save check thesis*/
  public getSaveCheckThesis(idCheckThesis): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/save-check-thesis/' + idCheckThesis)
  }

  /*Display list delete thesis unapproved*/
  public loadListCheckThesis(): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/load-list-delete-check-thesis/2')
  }

  /*Update check thesis*/
  public saveUpdateCheckThesis(idCheckThesis): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/update-check-thesis/' + idCheckThesis)
  }

  /*Delete list check thesis unapproved*/
  public deleteCheckThesis(idCheckThesis): Observable<any> {
    return this.http.delete(this.API_CHECK_THESIS + '/delete-check-thesis/' + idCheckThesis);
  }
}
