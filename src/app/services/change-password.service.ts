import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  public API_PASSWORD = 'http://localhost:8080/account/change-password-user/';
  public API_CONFIRM = 'http://localhost:8080/account/check-passsword-user/';
  public API_FIND_ACCOUNT ='http://localhost:8080/account/find-account/';

  constructor(private http : HttpClient) { }

  confirmPassword(idUser, passwordOld): Observable<any>{
    return  this.http.put(this.API_CONFIRM + idUser,passwordOld);
  }
  savePassword(idUser, passwordNew): Observable<any>{
    return this.http.put(this.API_PASSWORD +idUser,passwordNew);
  }
  findAccount(id):Observable<any>{
    return this.http.get(this.API_FIND_ACCOUNT + id)
  }

}
