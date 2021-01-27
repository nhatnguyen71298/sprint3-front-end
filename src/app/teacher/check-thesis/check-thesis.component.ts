import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../services/teacher.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailContentThesisComponent} from '../detail-content-thesis/detail-content-thesis.component';
import {Router} from '@angular/router';


@Component({
  selector: 'app-check-thesis',
  templateUrl: './check-thesis.component.html',
  styleUrls: ['./check-thesis.component.css']
})
export class CheckThesisComponent implements OnInit {
  checkThesis = [];
  listCheckThesis = [];


  constructor(public teacherService: TeacherService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.teacherService.getAllCheckThesis().subscribe(data => {
      this.checkThesis = data;
      console.log(this.checkThesis);
    });
  }

  saveCheckThesis() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listCheckThesis.length; i++) {
      this.teacherService.getSaveCheckThesis(this.listCheckThesis[i].idCheckThesis).subscribe(dataSaveCheckThesis => {
        this.ngOnInit();
      });
    }
  }

  changeCheckbox(checkThesis, i) {
    if (checkThesis) {
      checkThesis.checked = !checkThesis.checked;
      // this.checkThesis[i].checked = !this.checkThesis[i].checked;
    }
  }

  openDialog(i: number) {
    this.dialog.open(DetailContentThesisComponent, {
      position: {top: '85px'},
      width: '900px',
      height: '400px',
      data: {dataThesis: this.checkThesis[i]},
      disableClose: true
    });
  }

  doCheck(thesis: any, i: number) {
    setTimeout(() => {
      if (thesis.status === false && thesis.checked === true) {
        this.listCheckThesis.push(thesis);
      }
      for (i = 0; i < this.listCheckThesis.length; i++) {
        if (thesis.checked === false && thesis.idCheckThesis === this.listCheckThesis[i].idCheckThesis) {
          this.listCheckThesis.splice(i, 1);
        }
      }
    }, 1);
  }
}
