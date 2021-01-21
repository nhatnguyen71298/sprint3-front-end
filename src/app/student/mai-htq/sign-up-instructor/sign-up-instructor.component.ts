import { Component, OnInit } from '@angular/core';
import {MaiHtqService} from '../../../../service/mai-htq.service';
import {DetailTeacherComponent} from '../detail-teacher/detail-teacher.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-instructor',
  templateUrl: './sign-up-instructor.component.html',
  styleUrls: ['./sign-up-instructor.component.css']
})
export class SignUpInstructorComponent implements OnInit {
  public list = [];
  p: number;

  constructor(
    public teacherService: MaiHtqService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.teacherService.getAllTeacherService().subscribe(data => {
      this.list = data;
    });
  }

  openDialogView(id: any) {
    this.teacherService.findByID(id).subscribe(varialble => {
      const dialogRefEdit = this.dialog.open(DetailTeacherComponent, {
        width: '650px',
        height: '450px',
        data: {dataNeed: varialble},
        disableClose: true
      });

      dialogRefEdit.afterClosed().subscribe(result => {
        this.ngOnInit();
      });
    });
  }
}
