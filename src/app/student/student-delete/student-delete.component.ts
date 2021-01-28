import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StudentService} from '../../service/student.service';
import {StudentMessageComponent} from '../student-message/student-message.component';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.css']
})
export class StudentDeleteComponent implements OnInit {

  public studentOfFullName;
  public teacher;
  public topic;
  public studentCode;
  public studentOfId;
  public email;
  public phone;
  public idMessage = 3;

  constructor(private dialogRef: MatDialogRef<StudentDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private hoangService: StudentService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.studentOfFullName = this.data.data1.fullName;
    this.studentOfId = this.data.data1.id;
    this.teacher = this.data.data1.teacher;
    this.topic = this.data.data1.topic;
    this.studentCode = this.data.data1.studentCode;
    this.email = this.data.data1.email;
    this.phone = this.data.data1.phone;
  }

  deleteStudent() {
    console.log(this.studentOfId);
    this.hoangService.prepareDeleteStudent(this.studentOfId).subscribe(() => {
      this.hoangService.deleteStudent(this.studentOfId).subscribe(data => {
        console.log(data);
        this.dialogRef.close();
        this.openDialogMessage();
      });
    });
  }

// Dialog thông báo xoá thông tin sinh viên thành công.
  openDialogMessage() {
    const timeout = 3000;
    const dialogRef = this.dialog.open(StudentMessageComponent, {
      width: '500px',
      height: '300px',
      data: {dataMessage: this.idMessage},
      disableClose: false
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}
