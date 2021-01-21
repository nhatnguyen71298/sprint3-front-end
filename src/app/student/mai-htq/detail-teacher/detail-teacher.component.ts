import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-detail-teacher',
  templateUrl: './detail-teacher.component.html',
  styleUrls: ['./detail-teacher.component.css']
})
export class DetailTeacherComponent implements OnInit {
  public formView;

  constructor(
    public dialogRef: MatDialogRef<DetailTeacherComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formView = {
      teacherCode: this.data.dataNeed.teacherCode,
      fullName: this.data.dataNeed.fullName,
      email: this.data.dataNeed.email,
      identityNumber: this.data.dataNeed.identityNumber,
      phone: this.data.dataNeed.phone,
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
