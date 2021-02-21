import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressReportService {
  API_PROGRESS = 'http://localhost:8080/progress';

  constructor(private http: HttpClient) { }
  getProgressThesis(idStudent,idProgress): Observable<any> {
    return this.http.get(this.API_PROGRESS + '/' + idStudent + '/' + idProgress);
  }

  upload(file):Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);

    return this.http.post(this.API_PROGRESS +'/upload', formData)
  }
}
