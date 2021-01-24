import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructionDocumentService {
  public readonly API_PERIOD_OF_TIME: string = 'http://localhost:8080/'
  public readonly API_UPLOAD: string = 'http://localhost:8080/instruction/upload-instruction'
  public readonly API_LIST: string = 'http://localhost:8080/instruction/get-instruction-list/'
  public readonly API_DELETE: string = 'http://localhost:8080/instruction/delete-instruction/'

  constructor(public http: HttpClient) {
  }

  sendInstruction(file): Observable<any> {
    return this.http.post(this.API_UPLOAD, file);
  }

  getListInstruction():Observable<any>{
    return this.http.get(this.API_LIST+'2000-10-10/2021-12-12');
  }

  deleteInstruction(id):Observable<any>{
    return this.http.delete(this.API_DELETE + id);
  }
}
