import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {LoginComponent} from "../../login/login/login.component";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser;
  constructor(public dialog: MatDialog, public loginService : LoginService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit(): void {
    this.loginService.name.subscribe(val => {
      this.currentUser = val;
      console.log(this.currentUser)
    });
  }
  logout() {
    this.loginService.logout();
    this.currentUser = null;
    this.loginService.broadcastLoginChange(this.currentUser);
  }

  openDialog() {
    const dialogA = this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }
}
