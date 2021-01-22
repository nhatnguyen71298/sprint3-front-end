import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../service/student.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  public list;
  constructor(
    public studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.studentService.getAllStudentService().subscribe(data => {
      this.list = data;
    });
  }

}
