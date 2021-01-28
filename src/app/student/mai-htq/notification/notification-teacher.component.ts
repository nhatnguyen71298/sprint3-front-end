import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification-teacher.component.html',
  styleUrls: ['./notification-teacher.component.css']
})
export class NotificationTeacherComponent implements OnInit {
  protected message;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.message = this.data.notification;
  }

}
