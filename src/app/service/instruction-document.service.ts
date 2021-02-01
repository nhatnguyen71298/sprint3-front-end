import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructionDocumentService {
  public readonly API_GET_PERIOD_OF_TIME_LIST: string = 'http://localhost:8080/period-time/get-list'
  public readonly API_GET_PERIOD_OF_TIME: string = 'http://localhost:8080/period-time/find-by-date/'
  public readonly API_UPLOAD: string = 'http://localhost:8080/instruction/upload-instruction'
  public readonly API_LIST: string = 'http://localhost:8080/instruction/get-instruction-list/'
  public readonly API_DELETE: string = 'http://localhost:8080/instruction/delete-instruction/'

  constructor(public http: HttpClient) {
  }

  sendInstruction(file): Observable<any> {
    return this.http.post(this.API_UPLOAD, file);
  }

  getListInstruction(startDate, endDate): Observable<any> {
    return this.http.get(this.API_LIST + startDate + '/' + endDate);
  }

  deleteInstruction(id): Observable<any> {
    return this.http.delete(this.API_DELETE + id);
  }

  getListPeriod(): Observable<any> {
    return this.http.get(this.API_GET_PERIOD_OF_TIME_LIST);
  }

  findDatebyDate(date):Observable<any>{
    return this.http.get(this.API_GET_PERIOD_OF_TIME + date);
  }
}
