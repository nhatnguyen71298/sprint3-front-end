import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-notification-thesis',
  templateUrl: './notification-thesis.component.html',
  styleUrls: ['./notification-thesis.component.css']
})
export class NotificationThesisComponent implements OnInit {
  public messageUser;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<NotificationThesisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.messageUser = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
