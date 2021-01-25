import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../service/statistics.service';

@Component({
  selector: 'app-statistics-teacher',
  templateUrl: './statistics-teacher.component.html',
  styleUrls: ['./statistics-teacher.component.css']
})
export class StatisticsTeacherComponent implements OnInit {
  selection = 'teacher';
  studentList: Array<any>;
  teacherList: Array<any>;
  teacherAmount: number;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.statisticsService.thesisStatistics().subscribe(next => {
      this.studentList = next;
    })
    this.statisticsService.teacherStatistics().subscribe(next => {
      this.teacherList = next;
      for (const teacher of this.teacherList) {
        teacher.studentNumber = teacher.studentGroupList.map(x => x.studentList.length);
      }
      console.log(this.teacherList);
    })
  }

}
