import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaiHtqService {
  public readonly API: string = 'http://localhost:8080/teacher';

  constructor(
    public http: HttpClient
  ) {
  }

  findByID(idNeedFind: any): Observable<any> {
    return this.http.get(this.API + '/find-By-Id/' + idNeedFind);
  }

  findStudentCurrentlyLoggingById(idFind): Observable<any> {
    return this.http.get(this.API + '/student-logging/' + idFind);
  }

  quantityStudent(): Observable<any> {
    return this.http.get(this.API + '/quantity-student');
  }

  saveInstructor(idTeacher, idStudent): Observable<any> {
    return this.http.get(this.API + '/save-instructor/' + idTeacher + '/' + idStudent);
  }

 cancelTeacher(idTeacher): Observable<any> {
    return this.http.get(this.API + '/cancel/' + idTeacher);
  }
}


