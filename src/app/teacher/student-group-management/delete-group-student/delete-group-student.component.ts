import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GroupStudentService} from '../../../service/group-student.service';
import {MessageGroupStudentComponent} from '../message-group-student/message-group-student.component';


@Component({
  selector: 'app-delete-group-student',
  templateUrl: './delete-group-student.component.html',
  styleUrls: ['./delete-group-student.component.css']
})
export class DeleteGroupStudentComponent implements OnInit {
  public groupStudent;
  public deleteId;
  public idMessage = 3;
  public message = 'nothing';

  constructor(public dialogRef: MatDialogRef<DeleteGroupStudentComponent>,
              public groupStudentService: GroupStudentService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.groupStudent = this.data.dataDeleteGroup;
    this.deleteId = this.data.dataDeleteGroup.id;
  }

  deleteGroupStudent() {
    this.groupStudentService.deleteGroupStudent(this.deleteId).subscribe(data => {
      this.message = data.message;
      if (data.message === 'Complete') {
        this.openDialogMessage('OK');
        this.ngOnInit();
      } else if (data.message === 'Failed') {
        this.openDialogMessage('NotOK');
        this.ngOnInit();
      }
    }, () => {
      this.message = 'Error';
    }, () => {
      this.ngOnInit();
    })
  }

  openDialogMessage(message): void {
    const dialogRef = this.dialog.open(MessageGroupStudentComponent, {
      width: '555px',
      height: '200px',
      data: {dataMessage: message},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
