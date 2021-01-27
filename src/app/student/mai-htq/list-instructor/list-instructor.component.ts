import {Component, OnInit} from '@angular/core';
import {MaiHtqService} from '../../../../service/mai-htq.service';
import {DetailTeacherComponent} from '../detail-teacher/detail-teacher.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-sign-up-instructor',
  templateUrl: './list-instructor.component.html',
  styleUrls: ['./list-instructor.component.css']
})
export class ListInstructorComponent implements OnInit {
  protected listQuantityStudent = [];
  protected signUpTeacherList = [];
  protected selectedTeacher = [];
  protected checkChoose = true;
  protected p = 1;
  protected hiddenTable = true;
  protected selected = false;
  protected idStudent;
  protected idTeacher;
  protected teacher;
  protected student;
  protected position;
  protected message;

  constructor(
    private teacherService: MaiHtqService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.checkChoose = true;
    this.hiddenTable = true;
    this.selected = false;
    this.activatedRoute.params.subscribe(data => {
      this.idStudent = data.idStudent;
    });
    this.getStudentCurrentlyLoggingById();
  }

  openDialogView(id: any) {
    this.teacherService.findByID(id).subscribe(varialble => {
      const dialogRefEdit = this.dialog.open(DetailTeacherComponent, {
        width: '650px',
        height: '450px',
        data: {dataNeed: varialble},
        disableClose: true,
      });

      dialogRefEdit.afterClosed().subscribe(result => {
      });
    });
  }

  chooseInstructor(idTeacher) {
    this.hiddenTable = false;
    this.idTeacher = idTeacher;
    let indexOfList = -1;
    for (let i = 0; i < this.listQuantityStudent.length; i++) {
      if (this.listQuantityStudent[i].id === idTeacher) {
        indexOfList = i;
        this.signUpTeacherList.push(this.listQuantityStudent[i]);
        break;
      }
    }
    this.listQuantityStudent.splice(indexOfList, 1);
    this.checkChoose = false;
    this.p = 1;
  }

  getStudentCurrentlyLoggingById() {
    this.teacherService.findStudentCurrentlyLoggingById(this.idStudent).subscribe(
      (data) => {
        this.student = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
        this.position = this.student.position;
        this.teacherService.quantityStudent().subscribe(
          dataStudentGroup => {
            this.listQuantityStudent = dataStudentGroup;
          },
          () => {
            this.message = 'error';
          },
          () => {
            this.signUpTeacherList = [];
            let indexOfList = -1;
            for (let i = 0; i < this.listQuantityStudent.length; i++) {
              if (this.listQuantityStudent[i] != null && this.student.studentGroup.teacher != null) {
                if (this.listQuantityStudent[i].id === this.student.studentGroup.teacher.id) {
                  indexOfList = i;
                  this.hiddenTable = false;
                  this.checkChoose = false;
                  this.selected = true;
                  this.selectedTeacher.push(this.listQuantityStudent[i]);
                  this.listQuantityStudent.splice(indexOfList, 1);
                  break;
                }
              }
            }
          });
      });
  }

  openNotification(message): void {
    this.dialog.open(NotificationComponent, {
      width: '550px',
      height: '210px',
      data: {notification: message},
      disableClose: true
    });
  }

  cancelTeacher() {
    if (this.signUpTeacherList.length !== 0) {
      this.hiddenTable = true;
      this.checkChoose = true;
      this.signUpTeacherList.pop();
      this.getStudentCurrentlyLoggingById();
    } else {
      const idTeacher = this.student.studentGroup.teacher.id;
      this.teacherService.cancelTeacher(idTeacher).subscribe(
        (data) => {
          this.openNotification('cancel');
        },
        () => {
          this.message = 'error';
        },
        () => {
          this.selectedTeacher.pop();
          this.hiddenTable = true;
          this.checkChoose = true;
          this.ngOnInit();
        });
    }
  }

  signUpTeacher() {
    if (this.checkChoose) {
      this.openNotification('no choose');
    } else {
      let limit;
      let totalRegister;
      let quantityOfGroup;
      this.teacher = this.signUpTeacherList.pop();
      // tslint:disable-next-line:radix
      limit = Number.parseInt(this.teacher.limitStudentRegister);
      // tslint:disable-next-line:radix
      totalRegister = Number.parseInt(this.teacher.totalStudentRegister);
      // tslint:disable-next-line:radix
      quantityOfGroup = Number.parseInt(this.student.studentGroup.quantity);
      if (this.teacher.totalStudentRegister == null) {
        totalRegister = 0;
      }
      if ((totalRegister + quantityOfGroup) <= limit) {
        this.teacherService.saveInstructor(this.idTeacher, this.idStudent).subscribe((data) => {
            this.openNotification('success');
          },
          () => {
            this.message = 'error';
          },
          () => {
            this.ngOnInit();
          });
      } else {
        this.openNotification('outOf');
        this.hiddenTable = true;
        this.checkChoose = true;
      }
    }
  }
}
