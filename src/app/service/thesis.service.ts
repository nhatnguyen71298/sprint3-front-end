import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SearchThesis} from '../shared/searchThesis';
import {Page} from '../shared/page';
import {Thesis} from '../shared/thesis';
import {AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ThesisService {
  private readonly API = 'http://localhost:8080/thesis';

  private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) {
  }

  // tslint:disable-next-line:ban-types
  getFeedbackHttpOptions(searchField: SearchThesis, page: number): Object {
    const thesis = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: {
        statement: searchField.statement,
        amount: searchField.amount,
        page
      }
    };
    return thesis;
  }

  getThesisPage(searchField: SearchThesis, page: number): Observable<Page<Thesis>> {
    return this.http.get<Page<Thesis>>(`${this.API}/page`, this.getFeedbackHttpOptions(searchField, page));
  }

  getThesisList(): Observable<Thesis[]> {
    return this.http.get<Thesis[]>(`${this.API}/list`, this.options);
  }

  getThesisDetail(id): Observable<any> {
    return this.http.get(this.API + '/detail/' + id);
  }

  createThesis(id:number, thesis: Thesis): Observable<any> {
    return this.http.post(this.API + '/add/' + id, thesis);
  }

  editThesis(thesis, id): Observable<any> {
    return this.http.put<any>(this.API + '/edit/' + id, thesis);
  }

  deleteThesis(id: any): Observable<any> {
    return this.http.delete(this.API + '/delete/' + id);
  }

  validateWhiteSpace(control: AbstractControl) {
    if ((control.value as string).indexOf('  ') >= 0){
      return {whiteSpace: true};
    }
    return null;
  }

  validateSpecialCharacter(control: AbstractControl) {
    const specialCharacter = '[~`!' +
      '@#$%^&*()-+=/*?:;.,|]+';
    return (control.value.match(specialCharacter)) ? {
      specialCharacter: true
    } : null;
  }
}
