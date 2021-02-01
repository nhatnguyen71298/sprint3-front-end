import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../../service/statistics.service';
import {ExportService} from '../../../service/export.service';

@Component({
  selector: 'app-statistics-teacher',
  templateUrl: './statistics-teacher.component.html',
  styleUrls: ['./statistics-teacher.component.css']
})
export class StatisticsTeacherComponent implements OnInit {
  selection = 'teacher';
  studentList;
  teacherList = [];
  thesisList = [];
  duplicateThesisList = [];
  checkedThesisList = [];

  constructor(private statisticsService: StatisticsService,
              private exportService: ExportService
  ) {
  }

  ngOnInit(): void {
    this.statisticsService.studentStatistics().subscribe(next => {
      this.studentList = next;
    })
    this.statisticsService.teacherStatistics().subscribe(next => {
      this.teacherList = next;
      for (const teacher of this.teacherList) {
        teacher.studentNumber = teacher.studentGroupList.map(x => x.studentList.length);
      }
    })
    this.statisticsService.thesisStatistics().subscribe(next => {
      this.thesisList = next;
      this.duplicateThesisList = this.thesisList.map(x => x.amount);
      this.duplicateThesisList = this.duplicateThesisList.filter(x => x > 1);
    })
    this.statisticsService.checkedThesisStatistics().subscribe(next => {
      this.checkedThesisList = next;
      console.log(this.checkedThesisList);
    })
  }

  export(list, name) {
    this.exportService.exportTableToExcel(list, name);
  }
}
