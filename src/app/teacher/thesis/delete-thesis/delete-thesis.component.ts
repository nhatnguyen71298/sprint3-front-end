import {Component, Inject, OnInit} from '@angular/core';
import {ThesisService} from '../../service/thesis.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageThesisComponent} from '../message-thesis/message-thesis.component';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-delete-thesis',
  templateUrl: './delete-thesis.component.html',
  styleUrls: ['./delete-thesis.component.css']
})
export class DeleteThesisComponent implements OnInit {
  public thesis;
  public idDelete;
  public message = 'nothing';
  public idMessage = 3;
  public idMessageFail = 4;

  constructor(public dialogRef: MatDialogRef<DeleteThesisComponent>,
              public thesisService: ThesisService,
              public toast: ToastrService,
              private router: Router,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.thesis = this.data.dataDelete;
    this.idDelete = this.data.dataDelete.id;
  }

  deleteThesis() {
    this.thesisService.deleteThesis(this.idDelete).subscribe(data => {
        this.message = data.message;
        if (data.message === 'Complete') {
          this.openDialogMessage('Success');
          this.ngOnInit();
        } else if (data.message === 'Failed') {
          this.openDialogMessage('Failed');
          this.ngOnInit();
        }
      }, () => {
        this.message = 'Error';
      }, () => {
      this.ngOnInit();
      })
  }

  openDialogMessage(message): void {
    const dialogRef = this.dialog.open(MessageThesisComponent, {
      width: '555px',
      height: '200px',
      data: {dataMessage: message},
      disableClose: false
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }
}
