import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TeacherManagementService} from '../../../../service/teacher-management.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  search;
  private teacherList;

  constructor(
    private dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private teacherManagementService: TeacherManagementService
  ) { }

  ngOnInit() {
    this.teacherManagementService.getAll().subscribe(data => {
    this.teacherList = data;
  })
  }
  cancel() {
    this.dialogRef.close();
  }

}
