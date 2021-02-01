import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-student',
  templateUrl: './message-student.component.html',
  styleUrls: ['./message-student.component.css']
})
export class MessageStudentComponent implements OnInit {
  public messageUser;
  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<MessageStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.messageUser = this.data.dataMessage;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

}
