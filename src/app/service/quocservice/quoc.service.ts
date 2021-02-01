import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuocService {
  public readonly API: string = 'http://localhost:8080/student'
  public readonly API_GROUP: string = 'http://localhost:8080/group'
  public readonly API_NEWS : string = 'http://localhost:8080/news'
  constructor(public http: HttpClient) {
  }
  findAllStudentNoGroup(): Observable<any>{
    return this.http.get(this.API + '/listAllStudentNoGroup')
  }
  // goi ham search ra list danh sach sinh vien chưa có nhóm
  // @ts-ignore
  search( by, search): Observable<any> {
    console.log(this.API+'/studentNoGroup' + '?by=' + by + '&search=' + search )
    return this.http.get(this.API+'/studentNoGroup' + '?by=' + by + '&search=' + search);
  }
  // @ts-ignore
  findById(id): Observable<any> {
  return this.http.get(this.API+ '/studentById/' + id);
  }
  createNew(id:number,data): Observable<any> {
    console.log('service');
    console.log(data);
    return this.http.post(this.API_GROUP + '/createNew/' + id,data);
  }
  listAllNews() : Observable<any>{
    console.log('this.API_NEWS')
    return this.http.get(this.API_NEWS+ '/listAllNews')
  }
  getNewsById(id) : Observable<any>{
    return this.http.get(this.API_NEWS + '/newsById/' + id);
  }
}
