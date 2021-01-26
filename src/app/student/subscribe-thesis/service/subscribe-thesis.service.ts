import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeThesisService {
  protected readonly API: string = 'http://localhost:8080/subscribe';

  constructor(
    protected http: HttpClient,
  ) {
  }

  /**
   * Chau start
   */

  findStudentCurrentlyLoggingById(idFind): Observable<any> {
    return this.http.get(this.API + '/student-currently-logging/' + idFind);
  }

  getListThesisUnsubscribeService(idFind): Observable<any> {
    return this.http.get(this.API + '/list-thesis-unsubscribed/' + idFind);
  }

  getListThesisSubscribeService(idFind): Observable<any> {
    return this.http.get(this.API + '/list-thesis-subscribed/' + idFind);
  }

  findThesisById(idFind): Observable<any> {
    return this.http.get(this.API + '/thesis-detail/' + idFind);
  }

  subscribeThesisOfTeacher(idThesis, idStudent): Observable<any> {
    return this.http.get(this.API + '/subscribe-thesis-teacher/' + idThesis + '/' + idStudent);
  }

  unsubscribeThesis(idCheckThesis): Observable<any> {
    return this.http.get(this.API + '/unsubscribe/' + idCheckThesis);
  }

  createThesis(idStudent, thesis): Observable<any> {
    return this.http.post(this.API + '/create/' + idStudent, thesis);
  }

  /**
   * Chau end
   */
}
