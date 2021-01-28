import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-message-thesis',
  templateUrl: './message-thesis.component.html',
  styleUrls: ['./message-thesis.component.css']
})
export class MessageThesisComponent implements OnInit {
  public message;

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<MessageThesisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.message = this.data.dataMessage;
  }

  loadList() {
    this.dialog.closeAll();
    this.ngOnInit();
  }
}
