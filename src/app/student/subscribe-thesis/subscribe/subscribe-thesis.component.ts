import {Component, ElementRef, OnInit} from '@angular/core';
import {SubscribeThesisService} from '../service-subscribe/subscribe-thesis.service';
import {MatDialog} from '@angular/material/dialog';
import {ViewThesisComponent} from '../view-thesis/view-thesis.component';
import {NotificationSubscribeComponent} from '../notification-subscribe/notification-subscribe.component';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeThesisComponent implements OnInit {
  protected thesisOfStudentCurrent = [];
  protected thesisListUnsubscribed = [];
  protected thesisListSubscribed = [];
  protected thesisOfOtherGroup = [];
  protected newSubscribeThesis = [];
  protected checkStatement = true;
  protected checkTeacher = true;
  protected hiddenTable = true;
  protected checkChoose = true;
  protected checkGroup = true;
  protected approved = false;
  protected exists = false;
  protected p = 1;
  protected student;
  protected position;
  protected idStudent;
  protected type = 'Unknown';
  protected message = 'Nothing';
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
    this.getStudent();
  }

  getStudent() {
    this.subscribeThesisService.findStudent(this.idStudent).subscribe(
      (data) => {
        this.student = data;
      },
      () => {
        this.openNotification('Error');
      },
      () => {
        if (this.student != null) {
          this.exists = true;
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
        }
      });
  }

  getListThesisUnsubscribed() {
    this.subscribeThesisService.findThesisUnsubscribe(this.idStudent).subscribe(
      (data) => {
        this.thesisListUnsubscribed = data;
      },
      () => {
        this.openNotification('Error');
      },
      () => {
      });
  }

  filterThesisSubscribed() {
    this.subscribeThesisService.findThesisSubscribe(this.idStudent).subscribe(
      (data) => {
        this.thesisListSubscribed = data;
      },
      () => {
        this.openNotification('Error');
      },
      () => {
        for (let i = 0; i < this.thesisListSubscribed.length; i++) {
          if (this.thesisListSubscribed[i].studentGroup != null) {
            if (this.thesisListSubscribed[i].studentGroup.id === this.student.studentGroup.id) {
              this.checkChoose = false;
              this.hiddenTable = false;
              this.thesisOfStudentCurrent.push(this.thesisListSubscribed[i]);
              if (this.thesisListSubscribed[i].status === true) {
                this.approved = true;
              }
              this.thesisListSubscribed.splice(i, 1);
              break;
            }
          }
        }
        this.thesisOfOtherGroup = this.thesisListSubscribed;
      });
  }

  chooseThesisOfTeacher(id) {
    for (let i = 0; i < this.thesisListUnsubscribed.length; i++) {
      if (this.thesisListUnsubscribed[i].id === id) {
        if (this.thesisListUnsubscribed[i].amount.toString() !== this.student.studentGroup.quantity) {
          this.openNotification('Exceed');
        } else {
          this.type = 'Teacher';
          this.hiddenTable = false;
          this.newSubscribeThesis.push(this.thesisListUnsubscribed[i]);
          this.thesisListUnsubscribed.splice(i, 1);
          this.checkChoose = false;
          this.p = 1;
        }
        break;
      }
    }
  }

  deleteThesis() {
    this.thesisListUnsubscribed.unshift(this.newSubscribeThesis.shift());
    this.checkChoose = true;
    this.hiddenTable = true;
  }

  subscribeThesis() {
    if (this.student.position === true) {
      if (this.checkChoose) {
        this.openNotification('No Choose');
      } else {
        if (this.type === 'Teacher') {
          const idThesis = this.newSubscribeThesis.shift().id;
          this.subscribeThesisService.subscribeThesisOfTeacher(idThesis, this.idStudent).subscribe(
            (data) => {
              this.message = data.message;
              switch (this.message) {
                case 'Complete':
                  this.openNotification('Subscribe Complete');
                  break;
                case 'Subscribed':
                  this.openNotification('Subscribed');
                  break;
                case 'Duplicate':
                  this.openNotification('Duplicate');
                  break;
                case 'Not found':
                  this.openNotification('Not found');
                  break;
                default:
                  this.openNotification('Error');
              }
            },
            () => {
              this.openNotification('Error');
            },
            () => {
              this.ngOnInit();
            });
        }
      }
    } else {
      this.openNotification('Jurisdiction Subscribe');
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
    const dialogRef = this.dialog.open(NotificationSubscribeComponent, {
      width: '555px',
      height: '175px',
      data: {notification: message},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checkStatement = true;
      if (this.message === 'Subscribed') {
        this.hiddenTable = true;
        this.checkChoose = true;
      }
    })
  }

  unsubscribeThesis() {
    if (this.student.position === true) {
      this.hiddenTable = true;
      this.checkChoose = true;
      if (this.newSubscribeThesis.length !== 0) {
        this.thesisListUnsubscribed.unshift(this.newSubscribeThesis.shift());
        this.ngOnInit();
      }
      if (this.thesisOfStudentCurrent.length !== 0) {
        const checkThesis = this.thesisOfStudentCurrent.pop();
        if (checkThesis.status === false) {
          const idCheckThesis = checkThesis.id;
          this.subscribeThesisService.unsubscribeThesis(idCheckThesis).subscribe(
            (data) => {
              this.message = data.message;
              switch (this.message) {
                case 'Complete':
                  this.openNotification('Unsubscribe Complete');
                  break;
                case 'Approved':
                  this.openNotification('Cannot Cancel');
                  break;
                case 'Not found':
                  this.openNotification('Not found');
                  break;
                default:
                  this.openNotification('Error');
              }
            },
            () => {
              this.openNotification('Error');
            },
            () => {
              this.ngOnInit();
            });
        }
      }
    } else {
      this.openNotification('Jurisdiction Unsubscribe');
    }
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.createThesis();
    }
  }

  createThesis() {
    this.formCreate.markAllAsTouched();
    if (this.formCreate.valid) {
      this.formCreate.value.statement = this.formCreate.value.statement.trim();
      this.formCreate.value.description = this.formCreate.value.description.trim();
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.thesisOfOtherGroup.length; i++) {
        if (this.thesisOfOtherGroup[i].thesis.statement === this.formCreate.value.statement) {
          this.checkStatement = false;
          break;
        }
      }
      if (this.checkStatement) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.thesisListUnsubscribed.length; i++) {
          if (this.thesisListUnsubscribed[i].statement === this.formCreate.value.statement) {
            this.checkStatement = false;
            break;
          }
        }
      }
      if (this.checkStatement) {
        this.subscribeThesisService.createThesis(this.idStudent, this.formCreate.value).subscribe(
          (data) => {
            this.message = data.message;
            switch (this.message) {
              case 'Complete':
                this.openNotification('Subscribe Complete');
                break;
              case 'Subscribed':
                this.openNotification('Subscribed');
                break;
              case 'Duplicate':
                this.openNotification('Duplicate');
                break;
              case 'Not found':
                this.openNotification('Not found');
                break;
              default:
                this.openNotification('Error');
            }
          },
          () => {
            this.openNotification('Error');
          },
          () => {
            this.ngOnInit();
          });
      } else {
        this.openNotification('Duplicate Statement');
      }
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
