import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SubscribeThesisService} from '../service-subscribe/subscribe-thesis.service';
import {NotificationSubscribeComponent} from '../notification-subscribe/notification-subscribe.component';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  protected message = 'Nothing';
  protected idConfirm;
  protected dataConfirm;
  protected actionConfirm;

  constructor(
    private subscribeThesisService: SubscribeThesisService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.idConfirm = this.data.id;
    this.dataConfirm = this.data.dataConfirm;
    this.actionConfirm = this.data.action;
  }

  openNotification(message): void {
    this.dialog.open(NotificationSubscribeComponent, {
      width: '555px',
      height: '175px',
      data: {notification: message},
      disableClose: true
    });
  }

  unsub() {
    this.subscribeThesisService.unsubscribeThesis(this.idConfirm).subscribe(
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
      });
  }
}
