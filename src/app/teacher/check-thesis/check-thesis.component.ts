import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../services/teacher.service';
import {MatDialog} from '@angular/material/dialog';
import {DetailContentThesisComponent} from '../detail-content-thesis/detail-content-thesis.component';
import {DetailContentThesisApprovedComponent} from '../detail-content-thesis-approved/detail-content-thesis-approved.component';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-check-thesis',
  templateUrl: './check-thesis.component.html',
  styleUrls: ['./check-thesis.component.css']
})
export class CheckThesisComponent implements OnInit {
  checkThesis = [];
  checkThesisApproved = [];
  listCheckThesis = [];
  loadListDeleteCheckThesis = [];


  constructor(public teacherService: TeacherService,
              public dialog: MatDialog,
              private toast: ToastrService,
              public routes: Router) {
  }

  ngOnInit(): void {
    /*load list check thesis unapproved*/
    this.teacherService.getAllCheckThesis().subscribe(data => {
      this.checkThesis = data;
    });
    /*load list check thesis approved*/
    this.teacherService.getAllCheckThesisApproved().subscribe(dataApproved => {
      this.checkThesisApproved = dataApproved;
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

  /*function save check box*/
  saveCheckThesis() {
    if (this.listCheckThesis.length > 0) {
      /*save check thesis*/
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listCheckThesis.length; i++) {
        this.teacherService.getSaveCheckThesis(this.listCheckThesis[i].idCheckThesis)
          .subscribe(dataSaveCheckThesis => {
            /*load list check thesis delete*/
            this.teacherService.loadListCheckThesis().subscribe(dataLoadListDelete => {
              this.loadListDeleteCheckThesis = dataLoadListDelete;
              /*save update check thesis*/
              if (this.loadListDeleteCheckThesis.length !== 0) {
                // tslint:disable-next-line:prefer-for-of
                for (let h = 0; h < this.loadListDeleteCheckThesis.length; h++) {
                  this.teacherService.saveUpdateCheckThesis(this.loadListDeleteCheckThesis[h].id).subscribe(dataUpdate => {
                    console.log(dataUpdate);
                    /*delete check thesis*/
                    this.teacherService.deleteCheckThesis(this.loadListDeleteCheckThesis[h].id).subscribe(dataDelete => {
                      console.log(dataDelete);
                      this.ngOnInit();
                    });
                  });
                }
              } else {
                this.ngOnInit();
              }
            });
          });
      }
      this.toast.success('Duyệt đề tài thành công !');
    } else {
      this.toast.warning('Vui lòng chọn đề tài để duyệt !');
    }
  }

  /*Checkbox*/
  changeCheckbox(checkThesis, i) {
    if (checkThesis) {
      checkThesis.checked = !checkThesis.checked;
      /*this.checkThesis[i].checked = !this.checkThesis[i].checked;*/
    }
  }

  /*Display list check thesis status = false*/
  openDialog(i: number) {
    this.dialog.open(DetailContentThesisComponent, {
      position: {top: '85px'},
      width: '900px',
      height: '400px',
      data: {dataThesis: this.checkThesis[i]},
      disableClose: true
    });
  }

  /*Display list check thesis status = true*/
  openDialogApproved(i: number) {
    this.dialog.open(DetailContentThesisApprovedComponent, {
      position: {top: '85px'},
      width: '900px',
      height: '400px',
      data: {dataThesisApproved: this.checkThesisApproved[i]},
      disableClose: true
    });
  }

}
