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

  getListThesisService(idFind): Observable<any> {
    return this.http.get(this.API + '/list-thesis/' + idFind);
  }

  findThesisById(idFind): Observable<any> {
    return this.http.get(this.API + '/thesis-detail/' + idFind);
  }

  /**
   * Chau end
   */
}
