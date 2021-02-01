import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherManagementService} from '../../../../service/teacher-management.service';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.css']
})
export class NoResultComponent implements OnInit {
  result;
  private teacherList;

  constructor(
    private dialogRef: MatDialogRef<NoResultComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherManagementService: TeacherManagementService
  ) {
  }

  ngOnInit() {
    this.teacherManagementService.getAll().subscribe(data => {
      this.teacherList = data;
    })
  }

  cancel() {
    this.dialogRef.close();
  }
}
