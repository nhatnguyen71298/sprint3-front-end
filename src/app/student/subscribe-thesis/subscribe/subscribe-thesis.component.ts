import {Component, OnInit} from '@angular/core';
import {SubscribeThesisService} from '../service/subscribe-thesis.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ViewThesisComponent} from '../view-thesis/view-thesis.component';
import {NotificationComponent} from '../notification/notification.component';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.css']
})
export class SubscribeThesisComponent implements OnInit {
  protected thesisListExists = [];
  protected registeredThesisList = [];
  protected message = 'nothing';
  protected check = true;
  protected p = 1;

  constructor(
    private subscribeThesisService: SubscribeThesisService,
    private dialog: MatDialog,
    private activedRouter: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getListThesis();
  }

  getListThesis() {
    this.subscribeThesisService.getListThesisService(1).subscribe(
      (data) => {
        this.thesisListExists = data;
      },
      () => {
        this.message = 'error';
      },
      () => {
      });
  }

  choose(id) {
    let indexOfList = -1;
    for (let i = 0; i < this.thesisListExists.length; i++) {
      if (this.thesisListExists[i].id === id) {
        indexOfList = i;
        this.registeredThesisList.push(this.thesisListExists[i]);
        break;
      }
    }
    this.thesisListExists.splice(indexOfList, 1);
    this.check = false;
  }

  deleteThesis() {
    this.thesisListExists.unshift(this.registeredThesisList.shift());
    this.check = true;
  }

  subscribeThesis() {
    if (this.check) {
      this.openNotification('no choose');
    } else {
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
}
