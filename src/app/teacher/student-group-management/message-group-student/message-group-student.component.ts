import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-group-student',
  templateUrl: './message-group-student.component.html',
  styleUrls: ['./message-group-student.component.css']
})
export class MessageGroupStudentComponent implements OnInit {
  public message;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<MessageGroupStudentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.message = this.data.groupMess;
    const matDialogConfig: MatDialogConfig = new MatDialogConfig();
    matDialogConfig.position = {left: `40%`, top: `60px`};
    this.dialogRef.updatePosition(matDialogConfig.position);
  }

  loadList() {
    this.dialog.closeAll();
    this.ngOnInit();
  }

}
