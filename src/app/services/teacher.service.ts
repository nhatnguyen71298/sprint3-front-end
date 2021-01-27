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

  public getAllStudent(): Observable<any> {
    return this.http.get(this.API_LIST_STUDENT + '/list-student-group/2')
  }

  public getAllCheckThesis(): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/list-check-thesis/2')
  }

  public getSaveCheckThesis(idCheckThesis): Observable<any> {
    return this.http.get(this.API_CHECK_THESIS + '/save-check-thesis/' + idCheckThesis)
  }

}
