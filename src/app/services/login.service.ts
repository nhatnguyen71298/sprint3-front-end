import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {AppAccount} from '../model/AppAccount';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_LOGIN = 'http://localhost:8080/authenticate';
  name: Subject<string> = new Subject();
  private currentUserSubject: BehaviorSubject<AppAccount>;
  public currentUser: Observable<AppAccount>;
  parsingUser;
  broadcastLoginChange(text: string) {
    this.name.next(text);
  }

  constructor(public http: HttpClient) {
    this.parsingUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<AppAccount>(this.parsingUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  // code 99,99% giống anh quân nên cách lấy id tương tự sprint 1 nghe
  public get currentUserValue(): AppAccount {
    return this.currentUserSubject.value;
  }
  authenticate(account): Observable<any> {
    return this.http.post<any>(this.API_LOGIN, account)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

}
