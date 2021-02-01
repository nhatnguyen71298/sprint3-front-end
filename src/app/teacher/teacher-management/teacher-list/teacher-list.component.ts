import { Component, OnInit } from '@angular/core';
import {TeacherManagementService} from '../../../service/teacher-management.service';
import {SuccessComponent} from '../success/success.component';
import {MatDialog} from '@angular/material/dialog';
import {SearchComponent} from '../alert/search/search.component';
import {NoResultComponent} from '../alert/no-result/no-result.component';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent implements OnInit {
  private teacherList;
  private input: any;
  private key: any;
  term: string;
  p: any;
  checkList: true;
  private list;
  constructor(public teacherManagementService: TeacherManagementService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.teacherManagementService.getAll().subscribe(data => {
      this.list = data;
    })
  }

  getTeacher() {
    // tslint:disable-next-line:no-unused-expression
    // @ts-ignore
    if (this.input == null || this.key == null) {
      this.teacherManagementService.search(this.input, this.key).subscribe(data => {
        const dialogRef = this.dialog.open(SearchComponent, {
          width: '510px',
          disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
          // @ts-ignore
          this.router.navigateByUrl('teacher/teacher-list');
        });
      })
    }
    this.teacherManagementService.search(this.input, this.key).subscribe(data => {
      this.list = data;
    })
  }
}
