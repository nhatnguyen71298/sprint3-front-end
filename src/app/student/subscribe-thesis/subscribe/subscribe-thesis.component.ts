import {Component, ElementRef, OnInit} from '@angular/core';
import {SubscribeThesisService} from '../service/subscribe-thesis.service';
import {MatDialog} from '@angular/material/dialog';
import {ViewThesisComponent} from '../view-thesis/view-thesis.component';
import {NotificationComponent} from '../notification/notification.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeThesisComponent implements OnInit {
  protected thesisListUnsubscribed = [];
  protected thesisListSubscribed = [];
  protected thesisListSubscribedByOtherGroup = [];
  protected subscribedThesisOfStudentCurrent = [];
  protected newSubscribeThesis = [];
  protected message = 'nothing';
  protected checkChoose = true;
  protected checkGroup = true;
  protected checkTeacher = true;
  protected hiddenTable = true;
  protected approved = false;
  protected thesisType = 'unknown';
  protected p = 1;
  protected idStudent;
  protected student;
  protected position;
  protected formCreate: FormGroup;

  constructor(
    private subscribeThesisService: SubscribeThesisService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    protected formBuilder: FormBuilder,
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.idStudent = data.idStudent;
    });
    this.getStudentCurrentlyLoggingById();
  }

  getStudentCurrentlyLoggingById() {
    this.subscribeThesisService.findStudentCurrentlyLoggingById(this.idStudent).subscribe(
      (data) => {
        this.student = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
        if (this.student.studentGroup != null) {
          if (this.student.studentGroup.teacher != null) {
            this.position = this.student.position;
            this.filterThesisSubscribed();
            this.getListThesisUnsubscribed();
            // create new Thesis :
            this.formCreate = this.formBuilder.group({
              statement: ['', [Validators.required, Validators.maxLength(50)]],
              amount: ['', [Validators.required, Validators.pattern('^(([1-9])|([1][0-5]))$')]],
              description: ['', [Validators.required, Validators.maxLength(50)]],
            });
          } else {
            this.checkTeacher = false;
          }
        } else {
          this.checkGroup = false;
        }
      });
  }

  getListThesisUnsubscribed() {
    this.subscribeThesisService.getListThesisUnsubscribeService(this.idStudent).subscribe(
      (data) => {
        this.thesisListUnsubscribed = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
      });
  }

  filterThesisSubscribed() {
    this.subscribeThesisService.getListThesisSubscribeService(this.idStudent).subscribe(
      (data) => {
        this.thesisListSubscribed = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
        for (let i = 0; i < this.thesisListSubscribed.length; i++) {
          if (this.thesisListSubscribed[i].studentGroup != null) {
            if (this.thesisListSubscribed[i].studentGroup.id === this.student.studentGroup.id) {
              this.checkChoose = false;
              this.hiddenTable = false;
              this.subscribedThesisOfStudentCurrent.push(this.thesisListSubscribed[i]);
              if (this.thesisListSubscribed[i].status === true) {
                this.approved = true;
              }
              this.thesisListSubscribed.splice(i, 1);
              break;
            }
          }
        }
        this.thesisListSubscribedByOtherGroup = this.thesisListSubscribed;
      });
  }

  chooseThesisOfTeacher(id) {
    this.thesisType = 'teacher';
    this.hiddenTable = false;
    for (let i = 0; i < this.thesisListUnsubscribed.length; i++) {
      if (this.thesisListUnsubscribed[i].id === id) {
        this.newSubscribeThesis.push(this.thesisListUnsubscribed[i]);
        this.thesisListUnsubscribed.splice(i, 1);
        break;
      }
    }
    this.checkChoose = false;
  }

  deleteThesis() {
    this.thesisListUnsubscribed.unshift(this.newSubscribeThesis.shift());
    this.checkChoose = true;
    this.hiddenTable = true;
  }

  subscribeThesis() {
    if (this.checkChoose) {
      this.openNotification('no choose');
    } else {
      if (this.thesisType === 'teacher') {
        const idThesis = this.newSubscribeThesis.shift().id;
        this.subscribeThesisService.subscribeThesisOfTeacher(idThesis, this.idStudent).subscribe(
          (data) => {
          },
          () => {
            this.message = 'error';
          },
          () => {
            this.ngOnInit();
          });
      }
    }
  }

  openDialogView(id) {
    this.subscribeThesisService.findThesisById(id).subscribe(thesis => {
      this.dialog.open(ViewThesisComponent, {
        width: '690px',
        height: '330px',
        data: {dataNeed: thesis},
        disableClose: true
      });
    });
  }

  openNotification(message): void {
    this.dialog.open(NotificationComponent, {
      width: '555px',
      height: '190px',
      data: {notification: message},
      disableClose: true
    });
  }

  unsubscribeThesis() {
    this.hiddenTable = true;
    this.checkChoose = true;
    if (this.newSubscribeThesis.length !== 0) {
      this.thesisListUnsubscribed.unshift(this.newSubscribeThesis.shift());
      this.ngOnInit();
    }
    if (this.subscribedThesisOfStudentCurrent.length !== 0) {
      const checkThesis = this.subscribedThesisOfStudentCurrent.pop();
      if (checkThesis.status === false) {
        const idCheckThesis = checkThesis.id;
        this.subscribeThesisService.unsubscribeThesis(idCheckThesis).subscribe(
          (data) => {
          },
          () => {
            this.message = 'error';
          },
          () => {
            this.ngOnInit();
          });
      }
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      // this.saveAndPrint();
    }
  }

  createThesis() {
    this.formCreate.markAllAsTouched();
    if (this.formCreate.valid) {
      this.formCreate.value.statement = this.formCreate.value.statement.trim();
      this.formCreate.value.description = this.formCreate.value.description.trim();
      this.subscribeThesisService.createThesis(this.idStudent, this.formCreate.value).subscribe(
        (data) => {
        },
        () => {
          this.message = 'error';
        },
        () => {
          this.ngOnInit();
        });
    } else {
      for (const KEY of Object.keys(this.formCreate.controls)) {
        if (this.formCreate.controls[KEY].invalid) {
          const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
          INVALID_CONTROL.focus();
          break;
        }
      }
    }
  }
}
