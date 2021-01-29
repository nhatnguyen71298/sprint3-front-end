import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-subscribe.component.html',
  styleUrls: ['./notification-subscribe.component.css']
})
export class NotificationSubscribeComponent implements OnInit {
  protected message;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    this.message = this.data.notification;
  }
}
