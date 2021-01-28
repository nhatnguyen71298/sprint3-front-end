import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupStudentService {
  private readonly API_GROUP = 'http://localhost:8080/group';

  constructor(private http: HttpClient) {
  }

  getGroupList(): Observable<any> {
    return this.http.get(this.API_GROUP + '/list');
  }

  deleteGroupStudent(id: any): Observable<any> {
    return this.http.delete(this.API_GROUP + '/delete/' + id);
  }

  setNullStudent(id: any): Observable<any> {
    return this.http.get(this.API_GROUP + '/setNull/' + id);
  }

  getFindById(id): Observable<any> {
    return this.http.get(this.API_GROUP + '/findBy/' + id);
  }

  getQuantityStudent(id): Observable<any> {
    return this.http.get(this.API_GROUP + '/infoStudent/' + id);
  }
}
