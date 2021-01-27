import {Component, Inject, OnInit} from '@angular/core';
import {FeedBackService} from "../../service/feed-back.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-feed-back-dialog',
  templateUrl: './feed-back-dialog.component.html',
  styleUrls: ['./feed-back-dialog.component.css']
})
export class FeedBackDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeedBackDialogComponent>,
    public feedBackService: FeedBackService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  deleteQuestion() {
    // @ts-ignore
    this.feedBackService.deleteQuestion(this.data).subscribe(dataDel => {
      this.feedBackService.getAllInteraction(this.data.toString()).subscribe(dataFirebase => {
        dataFirebase.map(e => {
          this.feedBackService.deleteInteraction(this.data.toString(), e.payload.doc.id);
        });
        this.dialogRef.close()
      });
    })
  }
}
