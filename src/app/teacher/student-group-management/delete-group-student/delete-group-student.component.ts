import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {GroupStudentService} from '../../../service/group-student.service';


@Component({
  selector: 'app-delete-group-student',
  templateUrl: './delete-group-student.component.html',
  styleUrls: ['./delete-group-student.component.css']
})
export class DeleteGroupStudentComponent implements OnInit {
  public groupStudent;
  public deleteId;

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
      }
    })
    // this.groupStudentService.setNullStudent(this.deleteId).subscribe(() => {
    // });
    // this.groupStudentService.deleteGroupStudent(this.deleteId).subscribe(data => {
    //   console.log(data);
    //   this.dialogRef.close();
    //   // this.openDialogMessage();
    // });
  }

}
