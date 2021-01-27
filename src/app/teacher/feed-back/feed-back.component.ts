import {Component, ElementRef, HostListener, OnChanges, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FeedBackService} from '../../service/feed-back.service';
import {FeedBackDialogComponent} from '../feed-back-dialog/feed-back-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Emoji} from "@ctrl/ngx-emoji-mart/ngx-emoji";

@Component({
  selector: 'app-feed-back',
  templateUrl: './feed-back.component.html',
  styleUrls: ['./feed-back.component.css']
})

export class FeedBackComponent implements OnInit {
  @ViewChild('emoji') emojiRef: ElementRef;
  idAccount = 2;
  feedBackList;
  p: any;
  infoQuestion: any;
  message;
  infor = {
    nameStudent: '',
    title: '',
    content: '',
    interactonId: 0
  };
  record = {
    name: '',
    content: ''
  };
  records: any;
  emoji = false;
  constructor(
    private feedbackService: FeedBackService,
    public dialog: MatDialog,
    private renderer: Renderer2
  ) {
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
      this.infor.interactonId = data.interactonId;
      this.infoQuestion = this.infor;
      this.feedbackService.getAllInteraction(data.interactonId.toString()).subscribe(data1 => {
        // console.log(data.slice(0, 3).map(e => console.log(e.payload.doc.data())));
        this.records = data1.slice(data1.length - 6, data1.length).map(e => {
          return {
            // @ts-ignore
            name: e.payload.doc.data().name,
            // @ts-ignore
            content: e.payload.doc.data().content,
          }
        })
      })
    });
  }

  close() {
    this.infoQuestion = '';
    this.emoji = false;
  }

  deteteQuestion(interactonId: any) {
    const dialogRef = this.dialog.open(FeedBackDialogComponent, {
      width: '500px',
      data: interactonId,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (this.infor.interactonId === interactonId){
        this.infoQuestion= '';
      }
      this.ngOnInit();
    });
  }

  sentFireBase(feedback: any) {
    // @ts-ignore
    if (document.getElementById('feedback').value !== '' && document.getElementById('feedback').value !== null) {
      this.feedbackService.getTeacherByAppAcount(this.idAccount).subscribe(inForTeacher => {
        // @ts-ignore
        this.record.name = inForTeacher.fullName;
        this.record.content = feedback.value;
        this.feedbackService.createInteraction(this.infor.interactonId.toString(), this.record).then(res => {
          this.record.name = '';
          this.record.content = '';
          // @ts-ignore
          document.getElementById('feedback').value = '';
          // this.ngOnInit();
        }).catch(error => console.log('lỗi'));
      })
    }
  }


  addEmoji($event: any) {
    // @ts-ignore
    document.getElementById('feedback').value += $event.emoji.native;
  }

  showEmoji($event: any) {
    this.emoji = !this.emoji;
    }
  // showEmoji($event: MouseEvent) {
  //   this.emoji = !this.emoji;
  //     if (this.emoji) {
  //       // tslint:disable-next-line:only-arrow-functions
  //       if(this.eRef.nativeElement.contains(event.target)) {
  //         this.emoji = false;
  //       }
  //     }
  // }

  closeEmoji() {
    this.emoji = false;
  }
}
