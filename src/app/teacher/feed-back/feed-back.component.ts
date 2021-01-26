import {Component, OnInit} from '@angular/core';
import {FeedBackService} from "../../service/feed-back.service";
import {NgxPaginationModule} from "ngx-pagination";
import {FeedBackDialogComponent} from "../feed-back-dialog/feed-back-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})

export class FeedBackComponent implements OnInit {
  idAccount = 2;
  feedBackList;
  p: any;
  infoQuestion: any;
  infor = {
    nameStudent: '',
    title: '',
    content: ''
  };

  constructor(
    private feedbackService: FeedBackService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.feedbackService.getAllFeedBack(this.idAccount).subscribe(data => {
      console.log(data);
      this.feedBackList = data;
    })
  }

  getInfoQuestion(interactonId: any) {
    this.feedbackService.getInfoQuestion(interactonId).subscribe(data => {
      console.log(data);
      this.infor.nameStudent = data.studentName;
      this.infor.title = data.title;
      this.infor.content = data.content;
      this.infoQuestion = this.infor;
    });
  }

  close() {
    this.infoQuestion = '';
  }

  deteteQuestion(interactonId: any) {
    const dialogRef = this.dialog.open(FeedBackDialogComponent, {
      width: '500px',
      data: interactonId,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}
