import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {
  private _token;
  private _isAuthenticated = false;
  private _user;

  get user() {
    return this._user;
  }

  set user(value) {
    this._user = value;
  }

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(value) {
    this._isAuthenticated = value;
  }

  constructor() { }

}
