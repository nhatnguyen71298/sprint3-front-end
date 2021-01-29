import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GroupStudentService} from '../../service/group-student.service';
import {MessageGroupStudentComponent} from "../message-group-student/message-group-student.component";


@Component({
  selector: 'app-delete-group-student',
  templateUrl: './delete-group-student.component.html',
  styleUrls: ['./delete-group-student.component.css']
})
export class DeleteGroupStudentComponent implements OnInit {
  public groupStudent;
  public deleteId;
  public idMessage = 3;

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
      if (data == null) {
        this.dialogRef.close();
        this.openDialogMessage();
      }
    })
  }

  private openDialogMessage() {
    const timeout = 1500;
    const dialogRef = this.dialog.open(MessageGroupStudentComponent, {
      width: '500px',
      height: '300px',
      data: {groupMess: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
