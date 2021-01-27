import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-chang-passsword',
  templateUrl: './change-passsword.component.html',
  styleUrls: ['./change-passsword.component.css']
})
export class ChangePassswordComponent implements OnInit {
  idUser;
  formChangePassword: FormGroup;

  constructor(public loginService: LoginService) {
    this.idUser = this.loginService.currentUserValue.id
  }

  ngOnInit(): void {
  }

}
