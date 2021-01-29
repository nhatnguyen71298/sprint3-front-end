import {Component, OnInit} from '@angular/core';
import {MaiHtqService} from '../../../../service/mai-htq.service';
import {DetailTeacherComponent} from '../detail-teacher/detail-teacher.component';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationTeacherComponent} from '../notification/notification-teacher.component';

@Component({
  selector: 'app-sign-up-instructor',
  templateUrl: './list-instructor.component.html',
  styleUrls: ['./list-instructor.component.css']
})
export class ListInstructorComponent implements OnInit {
  protected listQuantityStudent = [];
  protected signUpTeacherList = [];
  protected selectedTeacher = [];
  protected checkStudentExists = true;
  protected hiddenTableTeacher = true;
  protected hiddenTable = true;
  protected checkChoose = true;
  protected selected = false;
  protected p = 1;
  protected idStudent;
  protected idTeacher;
  protected position;
  protected teacher;
  protected student;

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
    this.getStudent();
  }

  getStudent() {
    this.teacherService.findStudentCurrentlyLoggingById(this.idStudent).subscribe(
      (data) => {
        this.student = data;
      },
      () => {
        this.openNotification('error');
      },
      () => {
        if (this.student == null) {
          this.checkStudentExists = false;
          this.hiddenTableTeacher = false;
        } else {
          this.position = this.student.position;
          this.teacherService.quantityStudent().subscribe(
            dataStudentGroup => {
              this.listQuantityStudent = dataStudentGroup;
            },
            () => {
              this.openNotification('error');
            },
            () => {
              if (this.student.studentGroup == null) {
                this.openNotification('check group');
              } else {
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
              }
            });
        }
      })
    ;
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

  cancelTeacher() {
    if (this.signUpTeacherList.length !== 0) {
      this.hiddenTable = true;
      this.checkChoose = true;
      this.signUpTeacherList.pop();
      this.getStudent();
    } else {
      const checkSubscribed = this.student.studentGroup.checkThesis;
      if (checkSubscribed != null) {
        this.openNotification('can not cancel');
      } else {
        const idStudentGroup = this.student.studentGroup.id;
        this.teacherService.cancelTeacher(idStudentGroup).subscribe(
          (data) => {
            this.openNotification('cancel');
          },
          () => {
            this.openNotification('error');
          },
          () => {
            this.selectedTeacher.pop();
            this.hiddenTable = true;
            this.checkChoose = true;
            this.ngOnInit();
          });
      }
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
            this.openNotification('error');
          },
          () => {
            this.ngOnInit();
          });
      } else {
        this.openNotification('outOf');
        this.hiddenTable = true;
        this.checkChoose = true;
        this.ngOnInit();
      }
    }
  }

  openNotification(message): void {
    this.dialog.open(NotificationTeacherComponent, {
      width: '550px',
      height: '210px',
      data: {notification: message},
      disableClose: true
    });
  }

  openDialogView(id: any) {
    this.teacherService.findByID(id).subscribe(varialble => {
      const dialogRefEdit = this.dialog.open(DetailTeacherComponent, {
        width: '650px',
        height: '341px',
        data: {dataNeed: varialble},
        disableClose: true,
      });

      dialogRefEdit.afterClosed().subscribe(result => {
      });
    });
  }
}
