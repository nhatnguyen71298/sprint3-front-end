import {Component, OnInit} from '@angular/core';
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
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      this.idStudent = data.idStudent;
    });
    this.getStudentCurrentlyLoggingById();
    this.filterThesisSubscribed();
    this.getListThesisUnsubscribed();
    // create new Thesis :
    this.formCreate = this.formBuilder.group({
      id: [''],
      passengerName: ['',
        [Validators.required, Validators.maxLength(150),
          Validators.pattern('^([a-zA-Z]([ ]?[a-zA-Z])*)([,]([a-zA-Z]([ ]?[a-zA-Z])*)*)*$')]],
      adults: ['', [Validators.required, Validators.pattern('^([0-9]+)$'),
        Validators.min(1), Validators.maxLength(2)]],
      babies: ['', [Validators.required,
        Validators.pattern('^([0-9]+)$'),
        Validators.maxLength(2)]],
      priceDeparture: ['', [Validators.required, Validators.pattern('^([0-9]+([.][0-9]+)?)$')]],
      priceArrival: [0, [Validators.required, Validators.pattern('^([0-9]+([.][0-9]+)?)$')]],
      statusCheckin: [''],
      ticketCode: [''],
      flightInformation: [''],
      invoice: [''],
      statusPayment: [''],
    });
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
        this.position = this.student.position;
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
}
