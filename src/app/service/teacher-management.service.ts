import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class TeacherManagementService {
  public apiGet = 'http://localhost:8080/teacher/get-all';
  public apiAdd = 'http://localhost:8080/teacher/add-new-teacher';
  public apiGetTeacher = 'http://localhost:8080/teacher/get-teacher';

  constructor(public http: HttpClient) {
  }

  public getAll(): Observable<any> {
    return this.http.get(this.apiGet);
  }

  public addNew(customer): Observable<any> {
    return this.http.post(this.apiAdd, customer);
  }

  search(input, key): Observable<any> {
    console.log(input, key);
    return this.http.get(this.apiGetTeacher + '/' + input + '/' + key);
  }

  validateWhitespace(c: AbstractControl) {
    if (c.value !== '') {
      const isWhitespace = c.value.trim().length === 0;
      if (isWhitespace) {
        const isValid = !isWhitespace;
        return isValid ? null : {whitespace: true};
      }
    }
  }

  validateSpecialCharacter(control: AbstractControl) {
    const specialCharacter = '[~`!@#$%^&*()-+=/*?:;.,|]+';
    return (control.value.match(specialCharacter)) ? {
      specialCharacter: true
    } : null;
  }

  validPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const phoneRegex = /^0[35789]\d{8}$/;
    const characterRegex = /^[^\d]+$/;
    // tslint:disable-next-line:variable-name
    const _phoneNumber: string = control.value;
    if (_phoneNumber === '') {
      return null;
    }
    if (characterRegex.test(_phoneNumber)) {
      return {phoneAlpha: true};
    }
    if (!phoneRegex.test(_phoneNumber)) {
      return {format: true};
    }
    return null;
  };
}
