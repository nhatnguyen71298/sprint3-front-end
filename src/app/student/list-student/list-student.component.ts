import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../service/student.service';
import {MatDialog} from '@angular/material/dialog';
import {AddStudentComponent} from '../add-student/add-student.component';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  public list;
  public checkList = true;
  public valueSearch: string;
  p: number;

  constructor(
    public studentService: StudentService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.studentService.getAllStudentService().subscribe(
      data => {
        this.list = data;
        // console.log(this.list);
      },
      () => {
      },
      () => {
      });
  }

  openDialogCreate(): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '700px',
      maxHeight: '90vh',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  search(): void {
    this.p = 0;
    this.studentService.searchStudent(this.valueSearch.trim()).subscribe(dataSearch => {
      this.list = dataSearch;
    });
  }
}
