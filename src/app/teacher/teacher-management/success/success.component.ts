import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherManagementService} from '../../../service/teacher-management.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  check;

  constructor(
    private dialogRef: MatDialogRef<SuccessComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherManagementService: TeacherManagementService) {
  }

  ngOnInit() {}

  cancel() {
    this.dialogRef.close();
  }
}
