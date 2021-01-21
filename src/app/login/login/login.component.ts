import {Component, ElementRef, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user;
  message;
  constructor(public dialogRef: MatDialogRef<LoginComponent>, public formBuilder: FormBuilder,
              public loginService: LoginService,
              public router: Router,
              public el: ElementRef) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.user = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.loginService.authenticate(this.user)
        .subscribe(data => {
          if (data.message) {
            this.message = data.message;
            this.loginService.logout();
          } else {
            this.user = data;
            console.log(this.user);
            this.loginService.broadcastLoginChange(this.user);
              this.dialogRef.close();
          }
        }, error => {
          this.message = 'Sai email hoặc password';
        });
    } else {
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formControlName="' + key + '"]');
          invalidControl.focus();
          break;
        }
      }
    }

  }
}
