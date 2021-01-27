import {Component, OnInit} from '@angular/core';
import {ChangePasswordService} from "../../services/change-password.service";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-aaa',
  templateUrl: './aaa.component.html',
  styleUrls: ['./aaa.component.css']
})
export class AaaComponent implements OnInit {
  students;
  idTeacher;

  constructor(public changePasswordService: ChangePasswordService, public loginService: LoginService) {
    this.idTeacher = this.loginService.currentUserValue.id;
  }

  ngOnInit(): void {
    this.changePasswordService.findAllStuden(this.idTeacher).subscribe(data => {
      this.students = data;
    })
  }

}
