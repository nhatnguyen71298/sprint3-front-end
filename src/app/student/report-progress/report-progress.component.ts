import {Component, OnInit} from '@angular/core';
import {ProgressReportService} from "../../service/progress-report.service";
import {Observable} from 'rxjs';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-report-progress',
  templateUrl: './report-progress.component.html',
  styleUrls: ['./report-progress.component.css']
})
export class ReportProgressComponent implements OnInit {
  idStudent1 = 1;
  idStudent2 = 2;
  idStudent3 = 3;
  idStudent4 = 4;
  nameStatement;
  commentOfProgress;
  mark = 'Chưa có điểm';
  dateSubmit: any;

  shortLink;
  loading = false;
  file: File = null;

  constructor(private progressService:ProgressReportService) {
  }

  ngOnInit(): void {
    this.progressService.getProgressThesis(this.idStudent1,1).subscribe(data =>{
      this.nameStatement = data.nameThesis;
      this.commentOfProgress = data.comment;
      if (data.mark != null){
        this.mark = data.mark;
      } else {
        this.mark = 'Chưa có điểm';
      }
      this.dateSubmit = data.dateSubmit;
      console.log(data);
    });
  }

  getProgress($event: number) {
    this.progressService.getProgressThesis(this.idStudent1,$event +1).subscribe(data =>{
      this.commentOfProgress = data.comment;
      if (data.status === 0){
        document.getElementById('trueProgress' + String($event +1)).style.display = 'none';
        document.getElementById('falseProgress' + String($event +1)).style.display = 'block';
      }
      if (data.status === 1){
        document.getElementById('trueProgress' + String($event +1)).style.display = 'block';
        document.getElementById('falseProgress' + String($event +1)).style.display = 'none';
      }
    });
  }


  uploadFile($event: Event) {
    // @ts-ignore
    this.file = $event.target.files[0];
    }

  sendThesis() {
    if (this.file != null){
      this.progressService.upload(this.file).subscribe(
        data => {
          console.log('ok')
        }
      );
    } else {
      console.log('Hãy chọn file');
    }
  }
}
