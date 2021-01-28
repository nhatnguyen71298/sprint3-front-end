import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {GroupStudentService} from '../../../service/group-student.service';

@Component({
  selector: 'app-quantity-student-group',
  templateUrl: './quantity-student-group.component.html',
  styleUrls: ['./quantity-student-group.component.css']
})
export class QuantityStudentGroupComponent implements OnInit {
  public listStudentGroup;

  constructor(public dialogRef: MatDialogRef<QuantityStudentGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public groupStudentService: GroupStudentService) { }

  ngOnInit(): void {
    this.groupStudentService.getQuantityStudent(this.data).subscribe(info =>{
      console.log(info);
      this.listStudentGroup = info;
    });
  }

}
