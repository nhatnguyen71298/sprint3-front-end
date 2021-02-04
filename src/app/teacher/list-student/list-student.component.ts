import {Component, OnInit} from '@angular/core';
import {TeacherService} from '../../services/teacher.service';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {
  students;

  constructor(public teacherService: TeacherService) {
  }

  ngOnInit(): void {
    this.teacherService.getAllStudent().subscribe(data => {
      this.students = data;
    });
  }

}
