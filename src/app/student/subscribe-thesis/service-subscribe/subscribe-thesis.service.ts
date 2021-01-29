import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribeThesisService {
  protected readonly API: string = 'http://localhost:8080/subscribe-thesis';

  constructor(
    protected http: HttpClient,
  ) {
  }

  /**
   * Chau start
   */

  findStudent(idFind): Observable<any> {
    return this.http.get(this.API + '/student/' + idFind);
  }

  findThesisUnsubscribe(idFind): Observable<any> {
    return this.http.get(this.API + '/thesis-unsubscribed/' + idFind);
  }

  findThesisSubscribe(idFind): Observable<any> {
    return this.http.get(this.API + '/thesis-subscribed/' + idFind);
  }

  findThesisById(idFind): Observable<any> {
    return this.http.get(this.API + '/thesis-detail/' + idFind);
  }

  subscribeThesisOfTeacher(idThesis, idStudent): Observable<any> {
    return this.http.get(this.API + '/thesis-teacher/' + idThesis + '/' + idStudent);
  }

  unsubscribeThesis(idCheckThesis): Observable<any> {
    return this.http.get(this.API + '/unsubscribe-thesis/' + idCheckThesis);
  }

  createThesis(idStudent, thesis): Observable<any> {
    return this.http.post(this.API + '/create/' + idStudent, thesis);
  }

  /**
   * Chau end
   */
}
