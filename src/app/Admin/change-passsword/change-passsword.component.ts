import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordService} from '../../services/change-password.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-chang-passsword',
  templateUrl: './change-passsword.component.html',
  styleUrls: ['./change-passsword.component.css']
})
export class ChangePassswordComponent implements OnInit {
  idUser;
  formChangePassword: FormGroup;
  account;
  errors: ErrorEvent;

  constructor(public loginService: LoginService, public formBuilder: FormBuilder,
              public changePasswordService: ChangePasswordService, private toastr: ToastrService, public route: Router,
              public dialogRef: MatDialogRef<ChangePassswordComponent>) {
    this.idUser = this.loginService.currentUserValue.id;
    this.formChangePassword = this.formBuilder.group({
      passwordOld: ['', [Validators.required]],
      passwordNew: ['', [Validators.required,  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]],
      passwordConfirm: ['', [Validators.required,  Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')]]
    }, {validator: this.checkPasswordConfirm});
  }

  checkPasswordConfirm(group: FormGroup) {
    console.log(group);
    const passwordNew = group.controls.passwordNew.value;
    const confirmPass = group.controls.passwordConfirm.value;
    return passwordNew === confirmPass ? null : {notSame: true};
  }

  ngOnInit(): void {
  }
  changePassword() {
    this.changePasswordService.findAccount(this.idUser).subscribe(data => {
      this.account = {
        passwordOld: this.formChangePassword.controls.passwordOld.value,
        passwordNew: this.formChangePassword.controls.passwordNew.value
      };
      this.changePasswordService.confirmPassword(this.idUser, this.account).subscribe(dataConfirm => {
        if (dataConfirm) {
          if (this.formChangePassword.valid) {
            this.changePasswordService.savePassword(this.idUser, this.account).subscribe(datab => {
              this.dialogRef.close();
              this.toastr.success('Đổi mật khẩu thành công');
            })
          }
        }
      });
    });
  }

  test() {
    console.log(this.formChangePassword.get('passwordConfirm').hasError('notSame'));
  }
}
