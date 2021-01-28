import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {GroupStudentService} from '../../../service/group-student.service';
import {DeleteGroupStudentComponent} from '../delete-group-student/delete-group-student.component';
import {QuantityStudentGroupComponent} from '../quantity-student-group/quantity-student-group.component';



@Component({
  selector: 'app-management-student-group',
  templateUrl: './management-student-group.component.html',
  styleUrls: ['./management-student-group.component.css']
})
export class ManagementStudentGroupComponent implements OnInit {
  groupList: any;

  constructor(private groupStudentService: GroupStudentService,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.groupStudentService.getGroupList().subscribe(data => {
      console.log(data);
      this.groupList = data;
    })
  }

  openDeleteDialog(id: any): void {
    this.groupStudentService.getFindById(id).subscribe(data => {
      const dialogRef = this.dialog.open(DeleteGroupStudentComponent, {
        width: '550px',
        data: {dataDeleteGroup: data},
        disableClose: false
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    })
  }

  openDetailDialog(id: any) {
      const dialogRef = this.dialog.open(QuantityStudentGroupComponent, {
        width: '750px',
        disableClose: false,
        data: id
      });
      dialogRef.afterClosed().subscribe(result => {
        this.ngOnInit();
      })
    }
}
